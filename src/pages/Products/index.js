import { useEffect, useState } from 'react';
import axios from "axios"
import './style.css'
import { BiEdit } from "react-icons/bi";
import {Link, useNavigate } from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"

const Products = () =>{
    const [products, setProducts]=useState([])
    const navigate=useNavigate()
    const [isTrue, setIsTrue] = useState(false)

    const getItem=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/products", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setProducts(result.data)
                setIsTrue(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRemoveProduct = (id) => {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/products/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                toast.success("Продукт успешно удален");
                navigate("/products")
            })
            .catch(error => {
                console.log(error)
            })

    }
    useEffect(() => {
		getItem()
        setIsTrue(false)
	}, [isTrue])

    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Товары</h1>
                <Link className='add_to' to="/producs/add">+ Добавить</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th>Размер</th>
                        <th>Рост</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(element => (
                        <tr key={element.id}>
                            <td>#{element.id}</td>
                            <td>{element.title}</td>
                            <td>{element.description}</td>
                            <td>{element.price} ₽</td>
                            <td>{element.size}</td>
                            <td>{element.height}</td>
                            <td><Link to={`/products/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                            <td><RiDeleteBin5Line onClick={()=>handleRemoveProduct(element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
};

export default Products;