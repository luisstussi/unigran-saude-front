import { Navigate } from 'react-router-dom';

export default function PrivateRoutes({children, isLogin}){

    const userToken = JSON.parse(sessionStorage.getItem("USER_TOKEN"));

    if(isLogin === true){
        return userToken ? <Navigate to="/scheduling"/> : children;
    } else{
        return userToken ? children : <Navigate to="/login"/>;
    }
}