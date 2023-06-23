import styled from 'styled-components';
import { useState, useEffect } from 'react'

import UsersAPI from '../service/UsersApi';

export default function Header({title, btnTitle, btnFunction}){

    const Header = styled.header`
        display: flex;
        border-bottom: 2px solid #F3F3F3;
        padding: 25px 20px 25px 80px;

        & h1{
            height: fit-content;
            margin: auto auto auto 0;
            font-weight: 500;
        }

        & button{
            display: flex;
            background-color: #03BD7A;
            align-items: center;
            color: white;
            grid-gap: 10px;
            border-radius: 9px;
            padding: 15px;
            font-size: 14px;
        }
    `

    const [userType, setUserType] = useState('');

    const setDetailsFunction = () => {
        UsersAPI.listMyself().then( res => {
            setUserType(res.data.tipo);
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        setDetailsFunction()
    }, [])

    return(
        <Header>
            <h1>{title}</h1>

            {userType === 'super' || userType === 'secretario' ? 
                <button onClick={() => btnFunction()}>
                    <img width={'20px'} height={'20px'} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/plus-math.png" alt='Ícone de sinal de mais. Usado no botão para sinalizar função de adição.'/>
                    {btnTitle}
                </button>
                :
                ''
            }

            
        </Header>
    )
}