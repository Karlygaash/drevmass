import { useState } from 'react';
import axios from "axios"
import './style.css'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddPromocode = () => {
    const [promocode, setPromocode]=useState("")
    const navigate=useNavigate()
    const handleAddPromocode = (e) => {
        e.preventDefault()
        if (!promocode.trim()) {
            alert("Заполните промокода!")
            return
        }
        const formDate=new FormData()
        formDate.append('promocode', promocode)
        const token = localStorage.getItem("dm_token")

		axios
			.post("http://185.100.67.103/api/activate", {
                promocode: promocode}, {
                headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                navigate("/promocode")
                toast.success("Промокод успешно создан");
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
                <form onSubmit={handleAddPromocode}>
                    <div className="form_box">
                        <label for="promocode" className="form_label">Введите промокода</label>   
                        <input
                            className="input"
                            name="promocode"
                            type="text"
                            value={promocode}
                            onChange={e => setPromocode(e.target.value)}
                        />
                    </div>
                    <div className='buttons'>
                        <Link to="/courses"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Активировать</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPromocode