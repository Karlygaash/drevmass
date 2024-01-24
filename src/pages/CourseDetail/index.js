import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './style.css'
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"

const CourseDetail = () => {
    const {courseId}=useParams()
    const [name, setName]= useState("")
    const [duration, setDuration]=useState()
    const [lessons, setLessons] = useState([])
    const navigate=useNavigate()

    const getCourseById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/course/${courseId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setName(result.data.name)
            setDuration(result.data.duration)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getLessonById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/course/${courseId}/lessons`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setLessons(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleRemoveLesson = (id) => {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/course/${courseId}/lessons/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                toast.success("Продукт успешно удален");
            })
            .catch(error => {
                console.log(error)
            })

    }
    
    useEffect(()=>{
        getCourseById()
        getLessonById()
    }, [])

    return (
        <div className="section">
            <div className="container">
                <h1 className="title__course">{name}</h1>
                <p className="duration_course">Длительность: {duration} мин</p>
                <div className='buttons'>
                        <Link to="/courses"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <Link to={`/courses/${courseId}/addLesson`}><button className='form__button'>Добавить уроки</button></Link>
                </div>
                <p className="lessons_course">Уроки:</p>
                <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Название</th>
                        <th>Длительность</th>
                        <th>Описание</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(element => (
                        <tr key={element.id}>
                            <td>#{element.name}</td>
                            <td>{element.title}</td>
                            <td>{element.duration}</td>
                            <td>{element.description}</td>
                            <td><Link to={`/courses/${courseId}/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                            <td><RiDeleteBin5Line onClick={()=>handleRemoveLesson(element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default CourseDetail;