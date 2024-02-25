import { useEffect, useState } from 'react';
import axios from "axios"
import { BiEdit } from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom"


const Support = () =>{
    const [support, setSupport]=useState([])
    const navigate = useNavigate()

    const getSupport=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/support", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setSupport(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
		getSupport()
	}, [])

    const handleProductDetail=(id)=>{
        navigate("/product/?productId={id}")
    }

    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Тех. поддержка</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Почта</th>
                        <th>Ответы</th>
                        <th>Проблемы</th>
                        <th>Время</th>
                        <th>Ответить</th>
                    </tr>
                </thead>
                <tbody>
                    {support.map(element => (
                        <tr key={element.id}>
                            <td>#{element.id}</td>
                            <td>{element.email}</td>
                            <td>{element.answer_description}</td>
                            <td>{element.problem_description}</td>
                            <td>{element.send_time}</td>
                            <td><Link to={`/support/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
};

export default Support;