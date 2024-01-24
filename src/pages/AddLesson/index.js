import { useState, useRef } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddLesson=()=>{
    const fileInput = useRef(null)
    const [name, setName] = useState("")
    const [title,setTitle]=useState("");
    const [description, setDescription]=useState("")
    const [video_src,setVideo_src]=useState("")
    const [image_src, setImage_src]=useState('')
    const [duration, setDuration]=useState("")

    const navigate = useNavigate()
    const {courseId} = useParams()

    const handleAddLesson = (e) => {
        e.preventDefault()
      
        const formDate = new FormData()
        formDate.append('title', title)
        formDate.append('name', name)
        formDate.append('description', description)
        formDate.append('video_src', video_src)
        formDate.append('image_src', fileInput.current.files[0])
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
                console.log(result)
                //navigate("/courses")
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
                <form onSubmit={handleAddLesson} className='form__createProduct'>
                <div className="form_box">
                        <label for="name" className="form_label">Введите имя урока</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="title" className="form_label">Введите название урока</label>   
                        <input
                            className="input"
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="description" className="form_label">Введите описание урока</label>   
                        <input
                            className="input"
                            name="description"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="video" className="form_label">Введите ссылку на видео</label>   
                        <input
                            className="input"
                            name="video"
                            type="text"
                            value={video_src}
                            onChange={e => setVideo_src(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="image" className="form_label">Выложите картинку</label>  
                        <input
                            className="input"
                            name="image"
                            type="file"
                            onChange={e => setImage_src((e.target.files[0]))}
                            ref={fileInput}
                        />
                    </div>
                    <div className="form_box">
                        <label for="duration" className="form_label">Введите длительность урока</label>   
                        <input
                            className="input"
                            name="duration"
                            type="text"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
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