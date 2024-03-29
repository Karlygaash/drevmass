import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";

const Applications = () =>{
    const [application, setApplication] = useState([])
    const getApplication=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/order", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setApplication(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getApplication()
	},[])
    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Заявки</h1>       
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Новые заявки</th>
                        <th>Сумма</th>
                        <th>Покупатель</th>
                        <th>Время заявки</th>
                        <th>Статус</th>
                        <th>Детали</th>
                    </tr>
                </thead>
                <tbody>
                    {application.map(element => (
                        <tr>
                            <td>#{element.id}</td>
                            <td>{element.total_price}</td>
                            <td>{element.username}</td>
                            
                            <td>{element.created_at}</td>
                            <td>
                                <select className='select'>
                                    <option value="">Потдвержден</option>
                                    <option value="">Оформлен</option>
                                    <option value="">Отменен</option>
                                </select>
                            </td>
                            <td><Link to={`/applications/${element.id}`} className='link_detail'>Детали</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
};

export default Applications;