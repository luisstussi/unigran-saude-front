import { useEffect, useState } from 'react';
import Header from '../../RepeatedElements/Header';
import ClientViewer from './ClientViewer/ClientViewer';
import './Clients.scss';
import ClientsAPI from '../../service/ClientsApi';

export default function Clients(){

    const [allClients, setAllClients] = useState([]);

    const searchAllClients = () => {
        ClientsAPI.listClients().then( res => {
            setAllClients(res.data)
        })
        .catch( err => {
            console.log(err, 'error');
        })
    }

    const [allOfClients, setAllOfClients] = useState([])

    const setAllOfClientsFunction = () => {
        ClientsAPI.listAttendants().then( res => {
            setAllOfClients(res.data)
            console.log(res.data);
        })
        .catch( err => {
            console.log(err, 'search attendants error');
        })
    }

    useEffect( () => {
        searchAllClients()
    }, [])

    return(
        <section className='sectionClientsBackground'>

            <Header
                title={'Clientes'}
                btnTitle={'Criar Cliente'}
            />
            
            <div className='divGridClients'>
                {allClients.map( client => {
                    return(
                        <ClientViewer
                            id={client.id}
                            userId={client.userId}
                            name={client.name}
                            cpf={client.cpf}
                            codigo={client.codigo}
                        />    
                    )
                })}
                
            </div>
        </section>
    )
}