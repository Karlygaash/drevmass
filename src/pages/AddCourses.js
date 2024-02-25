import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import NoImage from '../assets/no_image.jpeg'

const AddCourses=()=>{
    const [nameCourses, setNameCourses]=useState("")
    const [description, setDescription] = useState("")
    const [image_src, setImage_src] = useState()
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

    const navigate=useNavigate()

    const handleAddCourse = (e) => {
        e.preventDefault()
        if (!nameCourses.trim()) {
            alert("Заполните название курса!")
            return
        }

        if (!description.trim()) {
            alert("Заполните описание курса!")
            return
        }
      
        const token = localStorage.getItem("dm_token")

        const formDate=new FormData()
        formDate.append('name', nameCourses)
        formDate.append('description', description)
        formDate.append('image_src', image_src)

		axios
			.post("http://185.100.67.103/api/course", formDate, {
                headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                navigate("/courses")
                toast.success("Курс успешно создан");
                console.log(result)
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
			})
	    }

    return(
        <div className="section">
            <div className="container">
                <h1>Создать новый курс</h1>
                <form onSubmit={handleAddCourse} className='form'>
                    <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите название курса:</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={nameCourses}
                            onChange={e => setNameCourses(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="description" className="form_label">Введите описание курса:</label>   
                        <textarea
                            className="textarea"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
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
                            src={imageURL ? imageURL : {NoImage}}
                            alt="preview"
                            className='file-uploader__preview'
                        />
                        <div>{image_src ? image_src.name : ""}</div>
                    </div>
                    <div className='buttons'>
                        <Link to="/courses"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourses;