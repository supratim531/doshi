import axios from 'axios';
import logout from '../page/auth/LogoutComponent/logout';

const token = localStorage.getItem('token');

export const axiosClient = axios.create({
    baseURL: 'https://api.instade.io/api/v1/',
    // baseURL: 'http://localhost:8000/api/v1/',
    //timeout: 5000, //soubhagya tui bujhe nis time ta
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*'
    }
});

axiosClient.interceptors.response.use(res => {
    console.log('AxiosInterceptor res:', res);
    return res;
}, err => {
    console.log('AxiosInterceptor err:', err);

    if (err.response.data['message'] === 'Unauthenticated.' && err.response.status === 401) {
        logout()
    }
    if (err.response.status === 429) {
        alert(err.response.data['message']);
    }
    throw err;
});