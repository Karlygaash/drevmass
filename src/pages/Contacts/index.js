import { useEffect, useState } from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"
import './style.css'
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Contacts = () => {
    const [phone_number, setPhone_number] = useState("")
    const [whatsapp, setWhatsapp] = useState("")

    const getContacts=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/contacts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setPhone_number(result.data.number)
                setWhatsapp(result.data.whatsapp)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
		getContacts()
	}, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h1 className='title'>Контакты</h1>
                    <Link className='add_to' to="/promocode/add">+ Добавить</Link>
                </div>
                <div>
                    <div className='contacts'>
                        <p className="contact">Номер телефона: {phone_number}</p>
                        <button className='contact_button'>Изменить</button>
                    </div>
                    <div className='contacts'>
                        <p className="contact">WhatsApp: {whatsapp}</p>
                        <button className='contact_button'>Изменить</button>
                    </div>
                </div>
                <Link to="/setting"><IoArrowBackCircleSharp className='form__link'/></Link>
            </div>
        </div>
    );
};

export default Contacts;