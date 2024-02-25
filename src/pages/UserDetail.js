import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const UserDetail = () => {
    const {userId} = useParams();
    const [id, setId]= useState()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [birth, setBirth] = useState("")
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [activity,setActivity]=useState()
    const navigate=useNavigate()

    const getUserById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/user/information/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setId(result.data.id)
            setEmail(result.data.email)
            setName(result.data.name)
            setGender(result.data.gender)
            setPhone_number(result.data.phone_number)
            setBirth(result.data.birth)
            setHeight(result.data.height)
            setWeight(result.data.weight)
            setActivity(result.data.activity)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditUser = (e) =>{
        e.preventDefault()

        const token = localStorage.getItem("dm_token")

        axios
        .post(`http://185.100.67.103/api/user/information/${userId}`, {
            activity, birth, email, gender, height, id , name, phone_number, weight
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            console.log(result)
            navigate("/users")
            toast.success("Данные о пользователе успешно изменился");
        })
        .catch(error => {
            console.log(error)
            //toast.error(error.response.data.errors[0].message)
        })
    }

    useEffect(()=>{
        getUserById()
    }, [])
    return(
        <div className="section">
            <div className="container">
                <h1>Данные о пользователе</h1>
                <form onSubmit={handleEditUser} className='form'>
                    <div className="form_box">
                        <label for="email" className="form_label">Введите почту:</label>   
                        <input
                            className="input"
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="name" className="form_label">Введите имя:</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="phone_number" className="form_label">Введите номер телефона:</label>   
                        <input
                            className="input"
                            name="phone_number"
                            type="text"
                            value={phone_number}
                            onChange={e => setPhone_number(e.target.value)}
                        />
                    </div>

                    <div className="form_box">
                        <label for="gender" className="form_label">Пол:</label>   
                        <input
                            className="input"
                            name="gender"
                            type="text"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="birth" className="form_label">Введите дата рождения:</label>   
                        <input
                            className="input"
                            name="birth"
                            type="text"
                            value={birth}
                            onChange={e => setBirth(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="activity" className="form_label">Введите активити:</label>   
                        <input
                            className="input"
                            name="activity"
                            type="number"
                            value={activity}
                            onChange={e => setActivity(e.target.valueAsNumber)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="weight" className="form_label">Введите вес:</label>   
                        <input
                            className="input"
                            name="weight"
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.valueAsNumber)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="height" className="form_label">Введите рост:</label>   
                        <input
                            className="input"
                            name="height"
                            type="number"
                            value={height}
                            onChange={e => setHeight(e.target.valueAsNumber)}
                        />
                    </div>
                    <div className='buttons'>
                        <Link to="/users"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetail;