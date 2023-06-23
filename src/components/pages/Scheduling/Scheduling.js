import {useState, useEffect} from 'react';

import Header from '../../RepeatedElements/Header';
import SchedulingAPI from '../../service/SchedulingApi';
import './Scheduling.scss';
import SchedulingViewer from './SchedulingViewer/SchedulingViewer';
import CreateScheduling from './Create Scheduling/CreateScheduling';
import AttendantsAPI from '../../service/AttendantsApi';
import ClientsAPI from '../../service/ClientsApi';
import UsersAPI from '../../service/UsersApi';

export default function Scheduling(){

    const token = sessionStorage.getItem('USER_TOKEN');

    const [allSchedulings, setAllScheduling] = useState([]);

    // Requisição GET para receber todos os agendamentos do banco de dados e armazenar no hook "allScheduling"
    const setAllSchedulingFunction = () => {
        SchedulingAPI.listSchedulings().then( res => {
            setAllScheduling(res.data)
            console.log(res);
        })
        .catch( err => {

            if(err.response.status === 401){
                SchedulingAPI.listSchedulings().then( res => {
                    setAllScheduling(res.data)
                })
                .catch( err => {
                    console.log(err);
                })
            }

            return;
        })
    }

    const [allAttendants, setAllAttendants] = useState([]);

    // Requisição GET para receber todos os atendentes do banco de dados e armazenar no hook "allAttendants" e mandá-lo em um parâmetro do Elemento "CreateScheduling"
    const setAllAttendantsFunction = () => {
        AttendantsAPI.listAttendants().then( res => {
            setAllAttendants( res.data );
        })
        .catch( err => {
            console.log(err);
        })
    }

    const [allOfClients, setAllOfClients] = useState([]);

    // Requisição GET para receber todos os atendentes do banco de dados e armazenar no hook "allOfClients" e mandá-lo em um parâmetro do Elemento "CreateScheduling"
    const setAllOfClientsFunction = () => {
        ClientsAPI.listClients().then( res => {
            setAllOfClients( res.data );
        })
        .catch( err => {
            console.log(err);
        })
    }

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

        if(!token){
            return;
        }

        setAllSchedulingFunction();
    }, [token])

    useEffect( () => {
        setDetailsFunction()
        setAllAttendantsFunction()
        setAllOfClientsFunction();
    }, [])

    const [showCreateScheduling, setShowCreateScheduling] = useState(false);

    // Função que altera o hook "showCreateScheduling" entre true e false para exibir a tela de criação de agendamentos. Caso true, exibe. Caso false, oculta.
    const setShowCreateSchedulingFunction = () => {
        setShowCreateScheduling(true);
        return;
    }

    const [dateToUse, setDateToUse] = useState('');

    // Função que irá verificar a data após 5, 7, 15 ou 30 dias, a depender da escolha do usuário
    const setDateFunction = (id, moreDays) => {

        const element = document.getElementById(id);
        const activeSpan = document.getElementsByClassName('DayActive')[0];

        if (activeSpan === element) {
          element.className = 'DayInactive';
        } else {
          if (activeSpan) activeSpan.className = 'DayInactive';
          element.className = 'DayActive';
        }
      
        const date = new Date();
        date.setDate(date.getDate() + moreDays);
        setDateToUse(date);
    };


    const applyFiltersFunction = () => {

        setAllScheduling([]);

        let dateNow = new Date();
        dateNow = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1 <= 9 ? `0${dateNow.getMonth() + 1}` : dateNow.getMonth() + 1}-${dateNow.getDate() <= 9 ? `0${dateNow.getDate()}` : dateNow.getDate()}`;

        SchedulingAPI.listSchedulings( dateNow, `${dateToUse.getFullYear()}-${dateToUse.getMonth() + 1 <= 9 ? `0${dateToUse.getMonth() + 1}` : dateToUse.getMonth() + 1}-${dateToUse.getDate() <= 9 ? `0${dateToUse.getDate()}` : dateToUse.getDate()}`)
        .then( res => {
            setAllScheduling(res.data);
        })
        .catch( err => {
            console.log(err);
        })
    }
    

    return(
        <section className="sectionBackgroundScheduling">

            {/* Condicional feita para verificar se o hook "showCreateScheduling" está false ou true. Caso for true, irá retornar o elemento "CreateScheduling" que criará um agendamento*/}
            {showCreateScheduling === true ? <CreateScheduling setShowCreateScheduling={setShowCreateScheduling} allAttendants={allAttendants} allOfClients={allOfClients}/> : ''}

            <Header title={'Agendamentos'} btnTitle={'Criar Agendamento'} btnFunction={setShowCreateSchedulingFunction}/>

            <div className='divCenterElements'>

                <span className='spanShowAllScheduling'>

                    {allSchedulings.map( scheduling => {
                        return (
                            <SchedulingViewer 
                                id={scheduling.id}
                                clienteId={scheduling.clienteId}
                                pagamento_status={scheduling.pagamento_status}
                                data={scheduling.data}
                            />
                        )
                    })}
                    

                </span>

                {/* <span className='spanFilters'>
                    <div>
                        <h1>Filtros</h1>    
                    </div>

                    <span className='spanSearchInput'>
                        <img width={'25px'} height={'25px'} src="https://img.icons8.com/fluency-systems-regular/144/BABABA/search--v1.png" alt='Ícone de busca'/>
                        <input type='search' placeholder='Buscar Agendamento...'/>                 
                    </span>


                    
                    <div className='divFilter'>
                        <h3>Status do Pagamento</h3>

                        <div className='divGridFilter'>
                            <div>
                                <span id='spanFilterPaymentFree' className='inactive'>Gratuito</span>
                            </div>  
                            <div>
                                <span id='spanFilterPaymentPending' className='inactive'>Pendente</span>
                            </div>  
                            <div>
                                <span id='spanFilterPaymentPartial' className='inactive'>Parcial</span>
                            </div> 
                            <div>
                                <span id='spanFilterPaid' className='inactive'>Pago</span>
                            </div> 
                        </div>
                        
                    </div> 
                    <div className='divFilter'>
                        <h3>Status do Agendamento</h3>    
                        <div className='divGridFilter'>
                            <div>
                                <span id='spanFilterStatusPending' className='inactive'>Pendente</span>
                            </div>  
                            <div>
                                <span id='spanFilterStatusMarked' className='inactive'>Marcado</span>
                            </div>  
                            <div>
                                <span id='spanFilterStatusMaking' className='inactive'>Executado</span>
                            </div> 
                            <div>
                                <span id='spanFilterStatusReschedule' className='inactive'>Reagendar</span>
                            </div> 
                        </div>
                    </div> 
                    <div className='divFilter'>
                        <h3>Próximos Agendamentos</h3>

                        <div className='divGridFilter'>
                            <div>
                                <span id='spanFilter5dias' className='DayInactive' onClick={() => setDateFunction('spanFilter5dias', 5)}>5 dias</span>
                            </div>  
                            <div>
                                <span id='spanFilter7dias' className='DayInactive' onClick={() => setDateFunction('spanFilter7dias', 7)}>1 semana</span>
                            </div>  
                            <div>
                                <span id='spanFilter15dias' className='DayInactive' onClick={() => setDateFunction('spanFilter15dias', 15)}>15 dias</span>
                            </div> 
                            <div>
                                <span id='spanFilter30dias' className='DayInactive' onClick={() => setDateFunction('spanFilter30dias', 30)}>1 mês</span>
                            </div> 
                        </div>
                        
                    </div>

                    <button id='ApplyFilters' onClick={() => applyFiltersFunction()}>Aplicar Filtros</button>
                    
                </span> */}
            </div>

        </section>
    )
}