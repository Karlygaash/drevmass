import { useState, useEffect } from 'react';
import axios from "axios"
import './style.css'
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
                        <th>id</th>
                        <th>Цена</th>
                        <th>Покупатели</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {application.map(element => (
                        <tr>
                            <td>#</td>
                            <td>{element.total_price}</td>
                            <td>{element.username}</td>
             
                            <td><Link to={`/products/${element.id}`} className='link_edit'></Link></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
};

export default Applications;