import {useState, useEffect} from 'react'
import ClientsApi from '../../../service/ClientsApi';
import './SchedulingViewer.scss';

export default function SchedulingViewer({id, clienteId, atendenteId, pagamento_status, data}){

    const [userData, setUserData] = useState({});

    // Requisição GET para receber todas as informações do cliente que realizou o agendamento e armazenar no hook "userData"
    const setUserDataFunction = () => {
        ClientsApi.listOneClient(clienteId).then( res => {
            setUserData(res.data)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        setUserDataFunction();
    }, [])

    const date = new Date(data);

    return(
        <span className='spanSchedulingViewerBackground' key={id}>
            <div>
                <h2>{userData.name}</h2>    
                <img width={'25px'} height={'25px'} src="https://img.icons8.com/fluency-systems-regular/96/null/menu-2--v1.png" alt='Icone de três pontos um em cima do outro, para sinalizar uma função de visualizar mais informações'/>
            </div>
            
            <p>{userData.email}</p>

            <div className='divSchedulingInfo'>
                <img width={'20px'} height={'20px'} src="https://img.icons8.com/fluency-systems-regular/96/null/tear-off-calendar.png" alt='Icone de uma agenda para sinalizar a data do evento'/>
                {date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}-{date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-{date.getFullYear()}
            </div>

            <div className='divSchedulingInfo'>
                <img width={'20px'} height={'20px'} src="https://img.icons8.com/fluency-systems-regular/96/null/bonds.png" alt='Icone de uma nota de dinheiro para sinalizar o status do pagamento'/>
                Status: {pagamento_status}
            </div>
        </span>
    )
}