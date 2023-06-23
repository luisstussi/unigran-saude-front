import {useParams} from 'react-router-dom';

import './General.scss';
import MenuLeft from '../MenuLeft/MenuLeft';
import Scheduling from '../pages/Scheduling/Scheduling';
import Working from '../pages/Working/Working';
import Clients from '../pages/Clients/Clients';
import Attendants from '../pages/Working/Attendants/Attendants';
import { useState } from 'react';
import UsersAPI from '../service/UsersApi';
import { useEffect } from 'react';

export default function General(){

    const params = useParams();

    const [department, setDepartment] = useState();

    const setDepartmentFunction = () => {

        UsersAPI.listMyself().then( res => {
            setDepartment(res.data.departamento)
        })
        .catch( err => {
            console.log(err, 'user request error');
        })
    }

    useEffect( () => {
        setDepartmentFunction()
    }, [])
    

    const setPage = () => {

        switch(params.title){
            case 'scheduling':
                return <Scheduling/>
            case 'clients':
                return <Clients/>
            default: 
            ;
        }  
        
        switch(params.subtitle){
            case 'allWorking':
                return <Working/>
            case 'attendants':
                return <Attendants department={department}/>;
            default: ;
        }   
    }

    

    return(
        <div className='divGeneralBackground'>

            <MenuLeft/>

            {setPage()}

        </div>
    )
}