import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './style.css'
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const CourseDetail = () => {
    const [isTrue, setIsTrue] = useState(false)
    const {courseId}=useParams()
    const [name, setName]= useState("")
    const [duration, setDuration]=useState()
    const [lessons, setLessons] = useState([])
    const BaseUrl = "http://45.12.74.158/"

    const getCourseById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/course/${courseId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setName(result.data.course.name)
            setDuration(result.data.course.duration)
            console.log(result.data)
            if(result.data.all_lessons > 0){
                setLessons(result.data.course.lessons)
            }
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
                setIsTrue(true)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const deleteLesson = (name, id) => {
        confirmDialog({
        message: "Вы действительно хотите удалить этого урока?",
        header: `Удалить "${name}"?`,
        accept: () => handleRemoveLesson(id),
        // reject: () => rejectFunc()
        })
    }
    
    useEffect(()=>{
        getCourseById()
    }, [isTrue])

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
                        <th>id</th>
                        <th>Фото</th>
                        <th>Имя</th>
                        <th>Название</th>
                        <th>Длительность</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(element => (
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>      
                                <img
                                src={`${BaseUrl}${element.image_src}`}
                                alt="preview"
                                className="table_image"  
                                /> </td>
                            <td>{element.name}</td>
                            <td>{element.title}</td>
                            <td>{element.duration}</td>
                            <td><Link to={`/courses/${courseId}/lessons/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                            <td><RiDeleteBin5Line onClick={()=>deleteLesson(element.name, element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <ConfirmDialog/>
        </div>
    );
};

export default CourseDetail;