import { useState } from 'react';
import axios from "axios"
import './style.css'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddCourses=()=>{
    const [nameCourses, setNameCourses]=useState("")
    const navigate=useNavigate()
    const handleAddProduct = (e) => {
        e.preventDefault()
        if (!nameCourses.trim()) {
            alert("Заполните название курса!")
            return
        }
      
        const token = localStorage.getItem("dm_token")

		axios
			.post("http://185.100.67.103/api/course", {
                name: nameCourses}, {
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
                <form onSubmit={handleAddProduct}>
                    <div className="form_box">
                        <label for="name" className="form_label">Введите название курса</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={nameCourses}
                            onChange={e => setNameCourses(e.target.value)}
                        />
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