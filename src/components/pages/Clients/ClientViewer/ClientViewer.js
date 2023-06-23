import { useEffect, useState } from 'react';

import './ClientViewer.scss';
import ClientsAPI from '../../../service/ClientsApi';

export default function ClientViewer({id, userId, name, cpf, codigo}){

    const [userData, setUserData] = useState([]);

    const searchUserData = () => {
        ClientsAPI.listOneClient(id).then( res => {
            console.log(res.data);
            setUserData(res.data);
        })
        .catch( err => {
            console.log(err, 'error');
        })
    }

    useEffect( () => {
        searchUserData()
    }, [])

    return(
        <span className='spanClientViewer'key={id}>
            <div>
                <h2>{name}</h2>    
                <img width={'25px'} height={'25px'} src="https://img.icons8.com/fluency-systems-regular/96/null/menu-2--v1.png" alt='Icone de três pontos um em cima do outro, para sinalizar uma função de visualizar mais informações'/>
            </div>
            
            <div className='divClientInfo'>
                <p style={{marginTop: '-4px'}}>{userData.email}</p>
            </div>

            <div className='divClientInfo'>
                <p><b>CPF:</b> {cpf[0]}{cpf[1]}{cpf[2]}.{cpf[3]}{cpf[4]}{cpf[5]}.{cpf[6]}{cpf[7]}{cpf[8]}-{cpf[9]}{cpf[10]}</p>
                
            </div>

            <div className='divClientInfo'>
                <p> <b>CÓDIGO:</b> {codigo}</p>
            </div>
        </span>
    )
}