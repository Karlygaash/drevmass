import { useEffect, useState } from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"

const Promocode = () =>{
    const [promocode, setPromocode] = useState([])
    // const [status, setStatus] = useState("")
    let status=""

    const getPromocode=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/promocode", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setPromocode(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getPromocode()
    }, [])

    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Промокоды</h1>
                <Link className='add_to' to="/promocode/add">Активировать промокод</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Промокоды</th>
                        <th>Описание</th>
                        <th>Типы</th>
                        <th>Использование</th>
                        <th>Статус</th>
                        <th>Дедлайны</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {promocode.map(element => (
                        <tr key={element.id}>
                            <td>#</td>
                            <td>{element.promocode}</td>
                            <td>{element.description}</td>
                            <td>{element.promo_type}</td>
                            <td>{element.user_used}</td>
                            <td>{status = (element.status===true) ? "Активно":"Срок истек"}</td>
                            <td>{element.deadline}</td>
                            <td>{element.price}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
};

export default Promocode;