import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import '../assets/style/ApplicationDetail.css'

const ApplicationDetail = () => {
    const {applicationId} = useParams();
    const [username, setUsername] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [bonus, setBonus] = useState()
    const [total_price, setTotal_price] = useState()
    const [email, setEmail] = useState("")
    const [crm_link, setCrm_link] = useState();
    const [created_at, setCreated_at]= useState('')
    const [products, setProducts] = useState([])
    const BaseUrl = "http://185.100.67.103"

    const getApplicationById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/order/${applicationId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setUsername(result.data.username)
            setEmail(result.data.email)
            setTotal_price(result.data.total_price)
            setBonus(result.data.bonus)
            setCreated_at(result.data.created_at)
            setCrm_link(result.data.crm_link)
            setPhone_number(result.data.phone_number)
            setProducts(result.data.products)
            console.log(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        getApplicationById();
    },[])
    return(
        <div className="section">
            <div className="container">
                <div className='header'>
                    <h1 className='title'>Заказ</h1>
                    <Link className='add_to' to="/applications/edit">Изменить</Link>
                </div>
                <div className="section__content">
                    <table>
                        <thead>
                            <tr><th>Детали заказа</th></tr>
                        </thead>  
                        <tbody>
                            <tr><td>
                                Заказ №{applicationId}
                                <br></br>
                                Время: {created_at}
                            </td></tr>    
                        </tbody> 
                        <thead>
                            <tr><th>Покупатель</th></tr>
                        </thead>  
                        <tbody>
                            <tr><td>
                                <p>Имя: {username} </p>
                                <p>Почта: {email} </p>
                                <p>Номер телефона: {phone_number}</p>
                            </td></tr>    
                        </tbody> 

                        <thead>
                            <tr><th>Товары:</th></tr>
                        </thead>  
                        <tbody>
                            <tr><td>
                                <div className="order__list">
                                {products.map(element =>(
                                    <div key={element.id} className="order__card">
                                        <img
                                            src={`${BaseUrl}${element.image_src}`}
                                            alt="preview"
                                            className="order_image"  
                                        />  
                                        <div className="order__inf">
                                            <p className="order__title">{element.title}</p>
                                            <div className="order__price-count">
                                                <p className="order__price">{element.price} ₽</p>
                                                <p className="order__count">{element.basket_count} штук</p>
                                            </div>
                                        </div>             
                                    </div>
                                ))}
                                </div>
                            </td>
                            </tr>    
                        </tbody> 
                    </table>
                    <div className="order__crm">
                        <p>Перейти по ссылке: </p>
                        <p><Link>{crm_link}gg</Link></p>
                    </div>
                    <div className="summa__list">
                        <div className="summa__list-price">
                            <p className="summa__list-desc">Сумма</p>
                            <p>{total_price} ₽</p>
                        </div>
                        <div className="summa__list-price">
                            <p className="summa__list-desc">Оплата бонусами</p>
                            <p className="summa__list-bonus">{bonus} ₽</p>
                        </div>
                        <div className="summa__list-price">
                            <p className="summa__list-total">Итого</p>
                            <p className="summa__list-total">{total_price} ₽</p>
                        </div>
                    </div>
                </div>
                <Link to="/applications"><IoArrowBackCircleSharp className='form__link'/></Link>
            </div>
        </div>
    );
};

export default ApplicationDetail;