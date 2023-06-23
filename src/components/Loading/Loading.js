import {TouchBallLoading} from 'react-loadingg';

import Logo from '../../Logo.png'
import './Loading.scss';

export default function Loading(){

    return(
        <div className='divBackgroundLoading'>
            <img className='imgLogo' width={'200px'} height={'auto'} src={Logo} alt='Icone Teste'/>
            <TouchBallLoading size='small' color='#dbdbdb'/>
        </div>
    )
}