import Push from '../../assets/setting_icons/Image1.svg'
import Bonus from '../../assets/setting_icons/Image2.svg'
import Ocompanii from '../../assets/setting_icons/Image3.svg'
import Contact from '../../assets/setting_icons/Image4.svg'
import AmoCrm from '../../assets/setting_icons/Image5.svg'
import Icon from '../../assets/setting_icons/Icon.svg'
import './style.css'
import { useNavigate } from 'react-router-dom'

const Setting = () =>{
    const navigate=useNavigate();
    const handleContacts = () => {
        navigate("/setting/contacts")
    }

    return(
    <div className="section">
        <div className="section__container">
            <h1>Настройки</h1>
            <div className="content__row">
                <div className="content__box">
                    <img src={Push} alt="icon"/>
                    <div className='content_text'>
                        <h3>Push уведомления</h3>
                        <p>Настройка push уведомлений</p>
                    </div>
                    <div className='content__icon'>
                        <img src={Icon} alt=""/>
                    </div>
                </div>

                <div className="content__box">
                    <img src={Bonus} alt="icon"/>
                    <div className='content_text'>
                        <h3>Бонусная система</h3>
                        <p>Параметры бонусной системы</p>
                    </div>
                    <div className='content__icon'>
                        <img src={Icon} alt=""/>
                    </div>
                </div>

                <div className="content__box">
                    <img src={Ocompanii} alt="icon"/>
                    <div className='content_text'>
                        <h3>О компании</h3>
                        <p>Контент раздела “О компании”</p>
                    </div>
                    <div className='content__icon'>
                        <img src={Icon} alt=""/>
                    </div>
                </div>

                <div onClick={handleContacts} className="content__box">
                    <img src={Contact} alt="icon"/>
                    <div className='content_text'>
                        <h3>Контакты</h3>
                        <p>Настройка контактных данных и социальных сетей</p>
                    </div>
                    <div className='content__icon'>
                        <img src={Icon} alt=""/>
                    </div>
                </div>

                <div className="content__box">
                    <img src={AmoCrm} alt="icon"/>
                    <div className='content_text'>
                        <h3>AmoCRM</h3>
                        <p>Параметры для отправки заявок на AmoCRM</p>
                    </div>
                    <div className='content__icon'>
                        <img src={Icon} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Setting;