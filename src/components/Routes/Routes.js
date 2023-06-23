import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../Login/Login';
import General from '../General/General';
import PrivateRoutes from './PrivateRoutes';

export default function RoutesApplication(){

    return(
        <BrowserRouter>
        
        <Routes>
            <Route
                path='/login' element={
                    <PrivateRoutes isLogin={true}>
                        <Login/>    
                    </PrivateRoutes>
                }
            />

            <Route
                path='/' element={
                    <PrivateRoutes isLogin={false}>
                        <General/>
                    </PrivateRoutes>
                }
            />

            <Route
                path='/:title' element={
                    <PrivateRoutes isLogin={false}>
                        <General/>
                    </PrivateRoutes>
                }
            />

            <Route
                path='/:title/:subtitle' element={
                    <PrivateRoutes isLogin={false}>
                        <General/>
                    </PrivateRoutes>
                }
            />
        </Routes>

        </BrowserRouter>
    )
}