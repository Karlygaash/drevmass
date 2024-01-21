import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './style.css'
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const CourseDetail = () => {
    const {courseId}=useParams()
    const [name, setName]= useState("")
    const [duration, setDuration]=useState()
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
    
    useEffect(()=>{
        getCourseById()
    }, [])

    return (
        <div className="section">
            <div className="container">
                <h1 className="title__course">{name}</h1>
                <p className="duration_course">Длительность: {duration} мин</p>
                <div className='buttons'>
                        <Link to="/courses"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <Link to="/courses/:courseId/lesson"><button className='form__button'>Добавить уроки</button></Link>
                </div>
                <p className="lessons_course">Уроки:</p>
            </div>
        </div>
    );
};

export default CourseDetail;