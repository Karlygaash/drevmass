import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const EditWhatsapp = () =>{
    const [whatsapp, setWhatsapp] =useState("")
    const navigate=useNavigate();

    const getWhatsapp=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/contacts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setWhatsapp(result.data.whatsapp)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleEditWhatsapp = (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("dm_token")
        const formData= new FormData();
        formData.append('whatsapp', whatsapp)
        axios
            .post("http://185.100.67.103/api/contacts/whatsapp", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate("/setting/contacts")
                toast.success("Whatsapp успешно изменил");
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
		getWhatsapp()
	}, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h2>Изменить whatsapp</h2>
                </div>
                <form onSubmit={handleEditWhatsapp} className="form">
                    <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите whatsapp</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                    </div>
                    <div className="buttons">            
                        <Link to="/setting/contacts"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='contact_button'>Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWhatsapp;