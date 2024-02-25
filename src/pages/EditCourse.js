import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"

const EditCourse = () => {
    const [nameCourse, setNameCourse] = useState("")
    const [description, setDescription] = useState("")
    const [image_src, setImage_src] = useState()
    const {courseId} =useParams();
    const navigate = useNavigate()

    const getCourseById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/course/${courseId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setNameCourse(result.data.course.name)
            setDescription(result.data.course.description)
            setImage_src(result.data.course.image_src)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditCourse = (e) => {
        e.preventDefault()
        if (!nameCourse.trim()) {
            alert("Заполните название курса!")
            return
        }

        if (!description.trim()) {
            alert("Заполните описание курса!")
            return
        }
      
        const token = localStorage.getItem("dm_token")

        const formDate=new FormData()
        formDate.append('name', nameCourse)
        formDate.append('description', description)
        formDate.append('image_src', image_src)
        console.log(image_src)

		axios
			.patch(`http://185.100.67.103/api/course/${courseId}`, formDate, {
                headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                navigate("/courses")
                toast.success("Курс успешно изменился");
                console.log(result)
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
			})
	    }

    useEffect(()=>{
        getCourseById()
    }, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h2>Изменить данные</h2>
                </div>
                <form onSubmit={handleEditCourse} className="form">
                    <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите название курса:</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={nameCourse}
                            onChange={e => setNameCourse(e.target.value)}
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
                        <label htmlFor="image" className="form_label">Картинка:</label>  
                        <input
                            className="input"
                            name="image"
                            type="file"
                            onChange={e => setImage_src((e.target.files[0]))}
                        />
                    </div>
                    <div className="buttons">            
                        <Link to="/courses"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourse;