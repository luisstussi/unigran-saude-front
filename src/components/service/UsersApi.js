import axios from "axios";

const userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN'));

class UsersAPI{
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

    createUser(data){
        return this.instance.post('/cliente', data)
    }

    listUsers({departId}){
        return this.instance.get(`/depart/${departId}/clientes`);
    }

    listMyself(){
        return this.instance.get(`/user/detalhes`);
    }

    // listOneUser(clientId){
    //     return this.instance.get(`/cliente/${clientId}`);
    // }
}


export default new UsersAPI();