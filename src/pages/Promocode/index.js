import { useEffect, useState } from 'react';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify"

const Promocode = () =>{


    return(
    <div className='section'>
        <div className='container'>
            <div className='header'>
                <h1 className='title'>Промокоды</h1>
                <Link className='add_to' to="/promocode/add">+ Добавить</Link>
            </div>
            <table>
                {/* <thead>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Длительность</th>
                        <th>Курсы</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(element => (
                        <tr key={element.id}>
                            <td>#{element.id}</td>
                            <td>{element.name}</td>
                            <td>{element.duration}</td>
                            <td><Link to={`/courses/${element.id}`} className='link_detail'>Подробнее</Link></td>
                            <td><RiDeleteBin5Line onClick={()=>handleRemoveCourse(element.id)} className='edit_delete__buttons'/></td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    </div>);
};

export default Promocode;