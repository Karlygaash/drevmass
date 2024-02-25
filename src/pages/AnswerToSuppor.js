import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify"

const AnswerToSupport = () =>{
    const [email, setEmail] = useState("")
    const [problemDescription, setProblemDescription] = useState("")
    const {supportId} = useParams()
    const [answer, setAnswer] = useState("")
    const navigate=useNavigate();

    const GetSupportById = () => {
        const token = localStorage.getItem("dm_token")
        axios
            .get(`http://185.100.67.103/api/support/${supportId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {       
                setEmail(result.data.email)
                setProblemDescription(result.data.problem_description)
               
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleAnswerQuestion = (e) => {
        e.preventDefault();

        const formDate=new FormData()
        formDate.append('answer', answer)

        const token = localStorage.getItem("dm_token")

        axios
        .post(`http://185.100.67.103/api/support/${supportId}`, formDate, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            navigate("/support")
            toast.success("Успешно ответили");
        })
        .catch(error => {
            toast.error(error.response.data.errors[0].message)
        })
    }

    useEffect(()=>{
        GetSupportById()
    }, [])
    return(
        <div className='section'>
            <div className='container'>
                <div className='header'>
                    <h1 className='title'>Ответить</h1>
                </div>
                <div>
                    <p>Email: {email}</p>
                    <p>Проблемы: {problemDescription}</p>
                </div>
                <form onSubmit={handleAnswerQuestion}>
                    <h4>Ваш ответ:</h4>
                    <textarea
                        className="textarea"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                    />
                    <button className="form__button" type="submit">Ответить</button>
                </form>
                <Link to="/support/"><IoArrowBackCircleSharp className='form__link'/></Link>
            </div>
        </div>
    );
};

export default AnswerToSupport;