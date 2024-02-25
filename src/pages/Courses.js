import { useEffect, useState } from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"
import { BiEdit } from "react-icons/bi";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const Courses = () =>{
    const [courses, setCourses]=useState([])
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(false)
    const BaseUrl = "http://185.100.67.103"

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
                console.log(result.data)
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

    const deleteCourse = (name, id) => {
        confirmDialog({
        message: "Вы действительно хотите удалить этого курса?",
        header: `Удалить курс "${name}"?`,
        accept: () => handleRemoveCourse(id),
        // reject: () => rejectFunc()
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
                        <th>Картинка</th>
                        <th>Изменить</th>
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
                            <td>
                            <img
                                src={`${BaseUrl}${element.image_src}`}
                                alt="preview"
                                className="table_image"  
                                /> 
                            </td>
                            <td><Link to={`/courses/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                            <td><Link to={`/courses/${element.id}/lessons`} className='link_detail'>Подробнее</Link></td>
                            <td><RiDeleteBin5Line onClick={()=>deleteCourse(element.name, element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <ConfirmDialog/>
    </div>);
};

export default Courses;