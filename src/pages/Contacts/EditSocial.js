import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const EditSocial = () =>{
    const [vk, setVk] =useState("")
    const [youtube, setYoutube] = useState("")
    const navigate=useNavigate();

    const getSocial=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/social", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setVk(result.data.vk)
                setYoutube(result.data.youtube)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleEditSocial = (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("dm_token")
        const formData= new FormData();
        formData.append('vk', vk)
        formData.append('youtube', youtube)
        axios
            .post("http://185.100.67.103/api/social", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate("/setting/contacts")
                toast.success("Успешно изменил");
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
		getSocial()
	}, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h2>Изменить номер</h2>
                </div>
                <form onSubmit={handleEditSocial} className="form">
                    <div className="form_box">
                        <label htmlFor="vk" className="form_label">Введите ссылку на VK</label>   
                        <input
                            className="input"
                            name="vk"
                            type="text"
                            value={vk}
                            onChange={e => setVk(e.target.value)}
                        />
                    </div>
                    <div className="form_box">
                        <label htmlFor="youtube" className="form_label">Введите ссылку на Youtube</label>   
                        <input
                            className="input"
                            name="youtube"
                            type="text"
                            value={youtube}
                            onChange={e => setYoutube(e.target.value)}
                        />
                    </div>
                    <div className="buttons">            
                        <Link to="/setting/contacts"><IoArrowBackCircleSharp className='form__link'/></Link>
                        <button type="submit" className='contact_button'>Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditSocial;