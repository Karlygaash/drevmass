import './style.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import MainPageIcon from '../../assets/icons/main-page.svg'
import Favicon from '../../assets/icons/favicon.svg'
import Drevmass from '../../assets/icons/drevmass.svg'
import Application from '../../assets/icons/application.svg';
import Products from '../../assets/icons/products.svg'
import Promocode from '../../assets/icons/promocode.svg'
import Courses from '../../assets/icons/Courses.svg'
import Setting from '../../assets/icons/setting.svg'
import Support from '../../assets/icons/Support.svg'
import Users from '../../assets/icons/Users.svg'
import Logout from '../../assets/icons/logout.svg'

const MainLayout = () =>{
	let [modalWindowOpen, setModalWindowOpen] = useState(false);
	const navigate = useNavigate()

	const removeItem = () =>{
	    localStorage.removeItem("dm_token")
		navigate("/login")
	}

    useEffect(() => {
		const token = localStorage.getItem("dm_token")

		if (!token) {
			navigate("/login")
		}
	}, [navigate])
    return(
        <div className="mainLayout">
			<aside className="app__sidebar">
                <div className='logo_main'>
                    <img src={Favicon} alt=""/>
                    <img src={Drevmass} alt=""/>
                </div>
				<nav className="navigation">
					<ul className="navigation__items">
						<li className="navigation__item">
							<NavLink
								to="/"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={MainPageIcon} alt="Icon" />
								Главная
							</NavLink>
						</li>
						<li className="navigation__item">
							<NavLink
								to="/applications"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Application} alt="Icon" />
								Заявки
							</NavLink>
						</li>

                        <li className="navigation__item">
							<NavLink
								to="/products"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Products} alt="Icon" />
								Товары
							</NavLink>
						</li>

                        <li className="navigation__item">
							<NavLink
								to="/promocode"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Promocode} alt="Icon" />
								Промокоды
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/courses"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Courses} alt="Icon" />
								Курсы
							</NavLink>
						</li>
                        
						<li className="navigation__item">
							<NavLink
								to="/users"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Users} alt="Icon" />
								Пользователи
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/support"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Support} alt="Icon" />
								Тех. поддержка
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/setting"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<img src={Setting} alt="Icon" />
								Настройки
							</NavLink>
						</li>
					</ul>
				</nav>

				<div onClick={()=>setModalWindowOpen(modalWindowOpen=!modalWindowOpen)} className='log_out'> 
					<img src={Logout} alt=""/>
					<p>Выйти</p>
					{modalWindowOpen && ( 
					<div className='modalWindow'>
						<div className='modalWindow__container'> 
							<div className='modalWindow__ask'>Вы точно хотите выйти?</div>
							<div className='modalWindow__buttons'> 
								<button onClick={()=>setModalWindowOpen(modalWindowOpen=!modalWindowOpen)} className='button__no'>Остаться</button>
								<button onClick={removeItem} className='button__yes'>Выйти</button>
							</div>
						</div> 
					</div> )}
				</div>
			</aside>

			<main className="app__content">
				<Outlet />
			</main>
		</div>
    );
};

export default MainLayout;