import {useState, useEffect} from 'react';
import './CreateScheduling.scss';
import SchedulingAPI from '../../../service/SchedulingApi';
import AttendantsAPI from '../../../service/AttendantsApi';
import UsersAPI from '../../../service/UsersApi';
import ClientsAPI from '../../../service/ClientsApi';

export default function CreateScheduling({setShowCreateScheduling, allAttendants, allOfClients}){

    const [schedulingData, setSchedulingData] = useState({
        clienteId: '',
        atendenteId: '',
        data: '',
        duracao: '',
        obs: '',
    });

    // Handles state change
    const handleChangeCliente = (event) => {
        //schedulingData.atendenteId = 1;
        //console.log("Entrou Aqui - ",schedulingData.atendenteId)
    } 

    const closeCreateSchedulingFunction = () => {
        setShowCreateScheduling(false)
    }

    const createOneSchedulingFunction = () => {
        const elemento_cliente = document.getElementById('chose_cliente_id');
        const elemento_aluno = document.getElementById('chose_aluno_id');
        const elemento_duracao = document.getElementById('chose_duracao_id');
        const elemento_data = document.getElementById('chose_data_id');
        const elemento_hora = document.getElementById('chose_hora_id');
        const data = {
            obs: "Este é um teste",
            duracao: elemento_duracao.value,
            clienteId: elemento_cliente.value,
            atendenteId: elemento_aluno.value,
            data: `${elemento_data.value} ${elemento_hora.value}:00-04`,
            pagamento_forma: "dinheiro"
        }
        SchedulingAPI.createScheduling(data)
        closeCreateSchedulingFunction()
        window.location.reload();
    }

    const [attendantData, setAttendantData] = useState({})

    const searchAttendant = (attendantId) => {
        AttendantsAPI.listOneAttendant(attendantId)
        .then( res => {
            setAttendantData(res.data);
            console.log(res, 'atendente')
        })
        .catch( err => {
            console.log(err);
        })
    }

    const [clientData, setClientData] = useState({})

    const searchClient = (clientId) => {
        ClientsAPI.listOneClient(clientId)
        .then( res => {
            setClientData(res.data);
            console.log(res, 'cliente')
        })
        .catch( err => {
            console.log(err);
        })
    }

    const [allClients, setAllClients] = useState([]);

    const setDetailsFunction = () => {
        UsersAPI.listMyself().then( res => {
            setAllClients(res.data.clientes)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        setDetailsFunction()
    }, [])

    return(
        <span className='spanAbsoluteCreateSchedulingBackground'>

            <div className='divCreateSchedulingBackground'>
                <div>
                    <h1>Criar Agendamento</h1>    
                    <button id='btnCloseCreateScheduling' onClick={() => closeCreateSchedulingFunction()}>
                        <img width={'35px'} height={'35px'} src="https://img.icons8.com/windows/96/null/macos-close.png" alt='Ícone de X para fechar a aba'/>    
                    </button>
                </div>

                <div className='divInputInfos'>
                    <h2>Nome do Cliente</h2>
                    <select id='chose_cliente_id'>
                        <option disabled>Escolha o cliente</option>
                        {allOfClients.map(client => {
                            return(
                                <option value={client.id} >{client.name} - {client.cpf}</option>    
                            )
                        })}
                        
                    </select>
                </div>

                <div className='divInputInfos'>
                    <h2>Aluno que atenderá</h2>

                    <select id='chose_aluno_id'>
                        <option disabled>Escolha o atendente</option>
                        {allAttendants.map( attendant => {
                            return(
                                <option value={attendant.id}>{attendant.name} - {attendant.rgm}</option>
                            )
                        })}
                        
                    </select>
                </div>

                <div className='divInputInfos'>
                    <h2>Data</h2>
                    <input type='date' id='chose_data_id'/>
                    <input type='time' id='chose_hora_id'/>
                </div>

                <div className='divInputInfos'>
                    <h2>Tempo de Duração</h2>
                    <select id='chose_duracao_id'>
                        <option value={90}>1h30min</option>
                        <option value={60}>1h</option>
                        <option value={45}>45min</option>
                    </select>
                </div>

                <button id='btnCreateScheduling' onClick={() => createOneSchedulingFunction()}>Criar Agendamento</button>
            </div>

        </span>
    )
}