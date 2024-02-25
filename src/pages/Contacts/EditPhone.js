import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const EditPhone = () =>{
    const [number, setNumber] =useState("")
    const navigate=useNavigate();

    const getPhone=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/contacts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setNumber(result.data.number)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleEditPhone = (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("dm_token")
        const formData= new FormData();
        formData.append('number', number)
        axios
            .post("http://185.100.67.103/api/contacts/number", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate("/setting/contacts")
                toast.success("Номер успешно изменил");
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
		getPhone()
	}, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h2>Изменить номер</h2>
                </div>
                <form onSubmit={handleEditPhone} className="form">
                    <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите номер</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="buttons">            
                        <Link to="/setting/contacts"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='contact_button'>Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditPhone;