import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Favicon from '../../assets/icons/favicon.svg'
import EmailIcon from '../../assets/icons/emailIcon.svg'
import PasswordIcon from '../../assets/icons/passwordIcon.svg'
import styles from './style.module.css'
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () =>{
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmitClicked = (e) => {
		e.preventDefault()

		axios
			.post("http://185.100.67.103/api/login/admin", {
				email,
				password,
			})
			.then(result => {
				const token = result.data.access_token

				localStorage.setItem("dm_token", token)
                navigate("/")
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
			})
	}

    useEffect(() => {
		const token_ = localStorage.getItem("dm_token")

		if (token_) {
			navigate("/")
		}
	}, [navigate])

    return(<div className={styles.login}>
        <form onSubmit={handleSubmitClicked} className={styles.form}>
                <div className={styles.form__header}>
                    <img src={Favicon} alt=""/>
                    <h3>Добро пожаловать <br></br>
                        в Drevmass</h3>
                    <p>Заполните поля, чтобы войти <br></br>
                         в аккаунт <b>Админа </b>.</p>
                </div>
                <div className={styles.form_box}>
                    <label for="email" className={styles.form_label}>Введите e-mail</label>
                    <div className={styles.form__input}>
                        <img src={EmailIcon} alt=""/>
                        <input
                            className={styles.input}
                            name="email"
                            type="email"
                            minLength={4}
                            maxLength={50}
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.form_box}>
                    <label for="password" className="form-label">Введите пароль</label>
                    <div className={styles.form__input}>
                        <img src={PasswordIcon} alt=""/>
                        <input className={styles.input}
                            name="password"
                            type="password"
                            minLength={4}
                            maxLength={50}
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button className={styles.button} type="submit">Войти</button>
            </form>
    </div>)
};

export default Login;