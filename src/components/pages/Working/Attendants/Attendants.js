import './Attendants.scss';
import Header from '../../../RepeatedElements/Header';
import AttendantsAPI from '../../../service/AttendantsApi'
import { useEffect } from 'react';
import { useState } from 'react';
import AttendantsViewer from './AttendantsViewer.js/AttendantsViewer';

export default function Attendants({department}){

    const [allAttendants, setAllAttendants] = useState([])

    const setAllAttendantsFunction = () => {
        AttendantsAPI.listAttendants().then( res => {
            setAllAttendants(res.data)
            console.log(res.data);
        })
        .catch( err => {
            console.log(err, 'search attendants error');
        })
    }

    useEffect( () => {
        setAllAttendantsFunction()
    }, [])

    return(
        <section className='sectionAttendantsBackground'>

            <Header title={'Atendentes'} btnTitle={'Criar Atendente'} btnFunction={''}/>

            <div className='divGridShowAllAttendants'>
                {allAttendants.map( attendant => {
                    return(
                        <AttendantsViewer
                        id={attendant.id}
                        name={attendant.name}
                        rgm={attendant.rgm}
                        />
                    )
                })}

            </div>

        </section>
    )
}