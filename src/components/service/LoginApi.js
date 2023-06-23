import axios from "axios";

const userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN'));

class LoginAPI{
    constructor(){
        this.instance = axios.create({
            //baseURL: 'https://050f-200-199-220-74.ngrok.io',
            baseURL: 'http://192.168.32.177:3000',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }    
        })
    }

    Login(data){
        return this.instance.post('/signin', data)
    }
}


export default new LoginAPI();