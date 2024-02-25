import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductDetail = () => {
    const [isTrue, setIsTrue] = useState(false)
    const [value, setValue] = useState()
    const { productId } = useParams();
    const [title,setTitle]=useState("");
    const [price, setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [video_src,setVideo_src]=useState("")
    const [image_src, setImage_src]=useState('')
    const [height, setHeight]=useState("")
    const [size, setSize]=useState("")
    const [recommendation, setRecommendation] = useState([])
    const [product, setProduct] = useState([])

    const navigate=useNavigate()

    const getProductById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/products/${productId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setTitle(result.data.Product.title)
            setPrice(result.data.Product.price)
            setDescription(result.data.Product.description)
            setHeight(result.data.Product.height)
            setSize(result.data.Product.size)
            setImage_src(result.data.Product.image_src)
            setVideo_src(result.data.Product.video_src)
            setRecommendation(result.data.Recommend)
            console.log(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleAddRecommedation = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("dm_token")

        axios
        .post(`http://185.100.67.103/api/products/${productId}/rec/1`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditProduct = (e) =>{
        e.preventDefault()

        const formDate=new FormData()
        formDate.append('title', title)
        formDate.append('price', price)
        formDate.append('description', description)
        formDate.append('video_src', video_src)
        formDate.append('image_src', image_src)
        formDate.append('height', height)
        formDate.append('size', size)

        const token = localStorage.getItem("dm_token")

        axios
        .post(`http://185.100.67.103/api/products/${productId}`, formDate, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            navigate("/products")
            toast.success("Продукт успешно изменился");
        })
        .catch(error => {
            toast.error(error.response.data.errors[0].message)
        })
    }

    const handleRemoveRecommendation = (id) => {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/products/${productId}/rec/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                toast.success("Продукт успешно удален");
                setIsTrue(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getProduct=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/products", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setProduct(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getProductById();     
        getProduct();
    },[isTrue])


    return(
        <div className="section">
            <div className="container">
                <h1>Данные о товаре</h1>
                <form onSubmit={handleEditProduct} className='form'>
                    <div className="form_box">
                        <label for="title" className="form_label">Введите название товара:</label>   
                        <input
                            className="input"
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="price" className="form_label">Введите цена товара:</label>   
                        <input
                            className="input"
                            name="price"
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="description" className="form_label">Введите описание товара:</label>   
                        <textarea
                            className="textarea"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form_box">
                        <label for="video" className="form_label">Введите ссылку видео:</label>   
                        <input
                            className="input"
                            name="video"
                            type="text"
                            value={video_src}
                            onChange={e => setVideo_src(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="image" className="form_label">Выложите картинку:</label>   
                        <input
                            className="input"
                            name="image"
                            type="file"
                            onChange={e => setImage_src((e.target.files[0]))}
                        />
                    </div>
                    <div className="form_box">
                        <label for="height" className="form_label">Введите рост товара:</label>   
                        <input
                            className="input"
                            name="height"
                            type="text"
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                        />
                    </div>

                    <div className="form_box">
                        <label for="size" className="form_label">Введите размер товара:</label>   
                        <input
                            className="input"
                            name="size"
                            type="text"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                    </div>
                   
                    <div className='buttons'>
                        <Link to="/products"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Изменить</button>
                    </div>
                </form>

                <div className='recommedation_section'>
                    <h3>С этим товаром покупают</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendation.map(element => (
                                <tr key={element.id}>
                                    <td>#{element.id}</td>
                                    <td>{element.title}</td>
                                    <td>{element.price} ₽</td>
                                    <td><RiDeleteBin5Line onClick={()=>handleRemoveRecommendation(element.id)} className='edit_delete__buttons'/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <form onSubmit={handleAddRecommedation} className="form-select">
                        <h3>Добавьте еще рекомендательный товар</h3>
                        <select size="1" name="hero">
                            {product.map(element =>(
                            <option value={element.id}>{element.title}</option>
                            ))}
                        </select>
                        <button type="submit">Добавить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;