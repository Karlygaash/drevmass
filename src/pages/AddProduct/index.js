import { useState } from 'react';
import axios from "axios"
import './style.css'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddProduct=()=>{
    const [title,setTitle]=useState("");
    const [price, setPrice]=useState("")
    const [description, setDescription]=useState("")
    const [video_src,setVideo_src]=useState("")
    const [image_src, setImage_src]=useState('')
    const [height, setHeight]=useState("")
    const [size, setSize]=useState("")

    const navigate = useNavigate()


    const handleAddProduct = (e) => {
        e.preventDefault()
        if (!title.trim()) {
            alert("Заполните название товара!")
            return
          }
      
          if (!price.trim()) {
            alert("Заполните цену!")
            return
          }
      
          if (!description.trim()) {
            alert("Заполните описание товара!")
            return
          }
          if (!video_src.trim()) {
            alert("Выложите видео!")
            return
          }
      
          if (!height.trim()) {
            alert("Заполните рост товара!")
            return
          }
      
          if (!size.trim()) {
            alert("Заполните размер товара!")
            return
          }

          if (!image_src.trim()) {
            alert("Заполните размер товара!")
            return
          }

      
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
			.post("http://185.100.67.103/api/products/", formDate, {
                headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                console.log(result)
                navigate("/products")
                toast.success("Продукт успешно создан");
			})
			.catch(error => {
				//toast.error(error.response.data.errors[0].message)
                console.log(error)
			})
	    }

    return(
        <div className="section">
            <div className="container">
                <h1>Создать новый товар</h1>
                <form onSubmit={handleAddProduct} className='form__createProduct'>
                    <div className="form_box">
                        <label htmlFor="title" className="form_label">Введите название товара</label>   
                        <input
                            className="input"
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="price" className="form_label">Введите цена товара</label>   
                        <input
                            className="input"
                            name="price"
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="description" className="form_label">Введите описание товара</label>   
                        <input
                            className="input"
                            name="description"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="video" className="form_label">Видео</label>   
                        <input
                            className="input"
                            name="video"
                            type="text"
                            value={video_src}
                            onChange={e => setVideo_src(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="image" className="form_label">Картинка</label>
                        <img src={image_src}/>   
                        <input
                            className="input"
                            name="image"
                            type="file"
                            onChange={e => setImage_src((e.target.files[0]))}
                        />
                    </div>
                    <div className="form_box">
                        <label for="height" className="form_label">Введите рост товара</label>   
                        <input
                            className="input"
                            name="height"
                            type="text"
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label for="size" className="form_label">Введите размер товара</label>   
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
                        <button type="submit" className='form__button'>Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;