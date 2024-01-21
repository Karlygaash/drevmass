import { useEffect, useState } from 'react';
import axios from "axios"
import './style.css'
import {Link, useNavigate} from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"

const Courses = () =>{
    const [courses, setCourses]=useState([])
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(false)

    const getCourses=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/course", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setCourses(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRemoveCourse = (id)=> {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/course/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                setIsTrue(true)
                toast.success("Курс успешно удален");
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
		getCourses()
        setIsTrue(false)
	}, [isTrue])

    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Курсы</h1>
                <Link className='add_to' to="/courses/add">+ Добавить</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Длительность</th>
                        <th>Курсы</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(element => (
                        <tr key={element.id}>
                            <td>#{element.id}</td>
                            <td>{element.name}</td>
                            <td>{element.duration}</td>
                            <td><Link to={`/courses/${element.id}`} className='link_detail'>Подробнее</Link></td>
                            <td><RiDeleteBin5Line onClick={()=>handleRemoveCourse(element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
};

export default Courses;