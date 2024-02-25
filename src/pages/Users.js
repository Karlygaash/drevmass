import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import {Link, useNavigate } from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'


const Users = () =>{
    const [allUsers, setAllUsers]=useState([])
    const [isTrue, setIsTrue] = useState(false)
    const getUsers=()=>{
        const token = localStorage.getItem("dm_token")
        axios
            .get("http://185.100.67.103/api/user/all", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setAllUsers(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRemoveUsers =(id) => {
        const token = localStorage.getItem("dm_token")
        axios
            .delete(`http://185.100.67.103/api/user/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                toast.success("Пользователь успешно удален");
                setIsTrue(true)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
		getUsers()
	}, [isTrue])

    const deleteUser = (name, id) => {
        confirmDialog({
        message: "Вы действительно хотите удалить этого пользователи?",
        header: `Удалить пользователи ${name}?`,
        accept: () => handleRemoveUsers(id),
        // reject: () => rejectFunc()
        })
    }

    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h1 className='title'>Пользователи</h1>
                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Почта</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Изменить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(element => (
                            <tr key={element.id}>
                                <td>#{element.id}</td>
                                <td>{element.email}</td>
                                <td>{element.name}</td>
                                <td>{element.phone_number}</td>
                                <td><Link to={`/users/${element.id}`} className='link_edit'><BiEdit className='edit_delete__buttons'/></Link></td>
                                <td><RiDeleteBin5Line onClick={()=>deleteUser(element.name, element.id)} className='edit_delete__buttons'/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmDialog/>
        </div>
    );
};

export default Users;