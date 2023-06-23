import { useState } from 'react';
import './AttendantsViewer.scss';
import AttendantsAPI from '../../../../service/AttendantsApi';
import { useEffect } from 'react';

export default function AttendantsViewer({id, name, rgm}){

    const [attendant, setAttendant] = useState({});

    const setAttendantFunction = () => {
        AttendantsAPI.listOneAttendant(id).then( res => {
            setAttendant(res.data)
            console.log(res, 'aaaaaa');
        })
        .catch( err => {
            console.log(err, 'attendant search data error');
        })
    }

    useEffect( () => {
        setAttendantFunction()
    }, [])

    return(
        <span className='spanAttendantBackground' key={id}>
            <h1>{name}</h1>
            <p><b>Email: </b>{attendant.email}</p>
            <p><b>RGM: </b>{rgm}</p>

        </span>
    )
}