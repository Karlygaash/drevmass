import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { RiDeleteBin5Line } from "react-icons/ri";

const LessonDetail = () => {
    const {lessonId}= useParams()
    const {courseId} =useParams()
    const [title,setTitle]=useState("");
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [video_src,setVideo_src]=useState("")
    const [image_src, setImage_src]=useState('')
    const [duration, setDuration]=useState()
    const [usedProducts, setUsedProducts] = useState([])
    const [product, setProduct] = useState([])
    const [isTrue, setIsTrue] = useState(false)
    const [value, setValue] = useState()

    const navigate=useNavigate()

    const getLessonById = () => {
        const token = localStorage.getItem("dm_token")
        axios
        .get(`http://185.100.67.103/api/course/${courseId}/lessons/${lessonId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(result => {
            setTitle(result.data.title)
            setName(result.data.name)
            setDescription(result.data.description)
            setDuration(result.data.duration)
            setImage_src(result.data.image_src)
            setVideo_src(result.data.video_src)
            setUsedProducts(result.data.used_products)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEditLesson = (e) =>{
        e.preventDefault()

        const formDate=new FormData()
        formDate.append('title', title)
        formDate.append('name', name)
        formDate.append('description', description)
        formDate.append('video_src', video_src)
        formDate.append('image_src', image_src)
        formDate.append('duration', duration)

        const token = localStorage.getItem("dm_token")

        axios
        .post(`http://185.100.67.103/api/course/${courseId}/lessons/${lessonId}`, formDate, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            navigate(`/courses/${courseId}`)
            toast.success("Продукт успешно изменился");
        })
        .catch(error => {
            console.log(error)
            toast.error(error.response.data.errors[0].message)
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

    const handleAddRecommedation = (e) => {
        e.preventDefault()
        setValue(e.target.value)
        console.log(value)

        const token = localStorage.getItem("dm_token")
        const formDate=new FormData()
        formDate.append('product_id', 10)
        axios
        .post(`http://185.100.67.103/api/course/${courseId}/lessons/${lessonId}/used-products`, formDate, {
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

    const handleRemoveRecommendation = (id) => {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/course/${courseId}/lessons/${lessonId}/used-products`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                toast.success("Продукт успешно удален");
                setIsTrue(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getLessonById()
        getProduct()
    },[isTrue])


    return(
        <div className="section">
            <div className="container">
                <h1>О уроке</h1>
                <form onSubmit={handleEditLesson} className='form'>
                    <div className="form_box">
                        <label htmlFor="title" className="form_label">Введите название товара:</label>   
                        <input
                            className="input"
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="name" className="form_label">Введите имя урока:</label>   
                        <input
                            className="input"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="description" className="form_label">Введите описание товара:</label>   
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
                        <label htmlFor="duration" className="form_label">Введите длительность урока:</label>   
                        <input
                            className="input"
                            name="duration"
                            type="number"
                            value={duration}
                            onChange={e => setDuration(e.target.valueAsNumber)}
                        />
                    </div>
                   
                    <div className='buttons'>
                        <Link to={`/courses/${courseId}/lessons`}><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='form__button'>Изменить</button>
                    </div>
                </form>

                <div className='recommedation_section'>
                    <h3>В этом уроке используются:</h3>
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
                            {usedProducts.map(element => (
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
                        <select name="selectProduct" size="1">
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

export default LessonDetail;