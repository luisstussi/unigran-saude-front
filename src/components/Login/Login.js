import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import LoginApi from '../service/LoginApi';

import MobileVersion from '../../Mobile Version.svg';
import DesktopVersion from '../../Desktop Version.svg';
import Loading from '../Loading/Loading';

import './Login.scss';

export default function Login(){

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [showLoading, setShowLoading] = useState(false);

    const login = () => {

        LoginApi.Login({
            email: userData.email,
            password: userData.password})
            .then( res => {
                sessionStorage.setItem('USER_TOKEN', JSON.stringify(res.data.token));
                setShowLoading(true)

                setTimeout( () => {
                    window.location.reload();
                }, 1000)

                console.log(res);
            })
            .catch( err => {
                console.log(err);
            })
    }


    const [showPassword, setShowPassword] = useState('')

    const [phraseShow, setPhraseShow] = useState(0)
    const [subtitleShow, setSubtitleShow] = useState(0)
    

    const setPhrase = () => {
        if(phraseShow === 0){
            return "Realize e acompanhe os agendamentos de usuários"
        }
        else if(phraseShow === 1){
            return "Realize e acompanhe os agendamentos de usuários 1"
        }
        else if(phraseShow === 2){
            return "Realize e acompanhe os agendamentos de usuários 2"
        }
    }
    const setSubtitle = () => {
        if(subtitleShow === 0){
            return "Receba os pacientes e agende seus atendimentos de forma facilitada , visualizando informações e modificando, quando necessário"
        }
        else if(subtitleShow === 1){
            return "Receba os pacientes e agende seus atendimentos de forma facilitada , visualizando informações e modificando, quando necessário 1"
        }
        else if(subtitleShow === 2){
            return "Receba os pacientes e agende seus atendimentos de forma facilitada , visualizando informações e modificando, quando necessário 2"
        }
    }

    setInterval( () => {
        
        
    }, 3000)

    function seePassword(){
        const inputPassword = document.getElementById('inputPassword');

        if(inputPassword.getAttribute('type') === 'password'){
            inputPassword.setAttribute('type', 'text');
            setShowPassword('hidePassword');
        } else{
            inputPassword.setAttribute('type', 'password');
            setShowPassword('showPassword');
        }
    }

    
    return(
        <div id='divBackgroundLogin'>

            {showLoading === true ? <Loading/> : ''}

            <span id='spanFormLogin'>
                <h1>Bem-vindo novamente!</h1>
                <p>Insira seus dados de acesso para ser direcionado</p>
                <span id='spanForm'>

                    <input type='email' placeholder='Email' value={userData.email} onChange={(e) => [setUserData({...userData, email: e.target.value})]}/>

                    <div className='divPassword'>
                        <input id='inputPassword' type='password' placeholder='Password' value={userData.password} onChange={(e) => [setUserData({...userData, password: e.target.value})]}/>    
                        <button id='btnSeePassword' onClick={() => seePassword()}>
                            {showPassword === 'showPassword' ?
                                <img src="https://img.icons8.com/small/96/null/visible.png"/> 
                                :
                                <img src="https://img.icons8.com/small/96/null/closed-eye.png"/>
                            }
                        </button>
                    </div>

                    <button id='btnResetPassword'>Esqueceu sua Senha?</button>

                    <button id='btnLogin' onClick={() => login()}>Login</button>
                    
                </span>
            </span>


            <span id='spanBackgroundDecoration'>
                <h1>{setPhrase()}</h1>
                <h3>{setSubtitle()}</h3>

                <span id='spanShowEtp'>
                    <span id='spanFirst' className='active'/>
                    <span id='spanSecond'/>
                    <span id='spanThird'/>
                </span>

                <div className='divFlexImages'>
                    <img width={'auto'} height={'auto'} src={MobileVersion} alt='Imagem do login na versão mobile'/>
                    <img width={'auto'} height={'auto'} src={DesktopVersion} alt='Imagem do login na versão desktop'/>
                </div>
                
            </span>
        </div>
    )
}