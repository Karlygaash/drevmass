import { useState } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddLesson=()=>{
    const [name, setName] = useState("")
    const [title,setTitle]=useState("");
    const [description, setDescription]=useState("")
    const [video_src,setVideo_src]=useState("")
    const [image_src, setImage_src]=useState('')
    const [duration, setDuration]=useState()
    const [imageURL, setImageURL] = useState()
    const  fileReader = new FileReader()

    fileReader.onloadend = () => {
        setImageURL(fileReader.result)
    }

    const handleOnChange = (event) => {
        event.preventDefault();
        if(event.target.files && event.target.files.length){
            const file=event.target.files[0]
            setImage_src(file)
            fileReader.readAsDataURL(file)
        }
    }

    const navigate = useNavigate()
    const {courseId} = useParams()

    const handleAddLesson = (e) => {
        e.preventDefault()
      
        const formDate = new FormData()
        formDate.append('title', title)
        formDate.append('name', name)
        formDate.append('description', description)
        formDate.append('video_src', video_src)
        formDate.append('image_src', image_src)
        formDate.append('duration', duration)
        const token = localStorage.getItem("dm_token")
        console.log(formDate)
		axios
			.post(`http://185.100.67.103/api/course/${courseId}/lessons`, formDate, {
                headers: {
					Authorization: `Bearer ${token}`,
                    "Content-type" : "multipart/form-data"
				},
			})
			.then(result => {
                navigate(`/courses/${courseId}/lessons`)
                toast.success("Урок успешно создан");
			})
			.catch(error => {
				//toast.error(error.response.data.errors[0].message)
                console.log(error)
			})
	    }

    return(
        <div className="section">
            <div className="container">
                <h1>Создать новый урок</h1>
                <form onSubmit={handleAddLesson} className='form'>
                <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите имя урока:</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="title" className="form_label">Введите название урока:</label>   
                        <input
                            className="input"
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="description" className="form_label">Введите описание урока:</label>   
                        <textarea
                            className="textarea"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="video" className="form_label">Введите ссылку на видео:</label>   
                        <input
                            className="input"
                            name="video"
                            type="text"
                            value={video_src}
                            onChange={e => setVideo_src(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="image" className="file-uploader__custom-button">Выбирите картинку:</label>  
                        <input
                            className='file-uploader__upload-button'
                            id="image"
                            type="file"
                            onChange={handleOnChange}
                        />
                        <img
                            src={imageURL ? imageURL : ''}
                            alt="preview"
                            className='file-uploader__preview'
                        />
                        <div>{image_src ? image_src.name : ""}</div>
                    </div>
                    <div className="form_box">
                        <label htmlFor="duration" className="form_label">Введите длительность урока:</label>   
                        <input
                            className="input"
                            name="duration"
                            type="number"
                            value={duration}
                            onChange={e => setDuration(e.target.valueAsNumber)}
                        />
                    </div>
                    <div className='buttons'>
                        <Link to={`/courses/${courseId}`}><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLesson;