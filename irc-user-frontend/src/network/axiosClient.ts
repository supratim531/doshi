import axios from 'axios';

const token = localStorage.getItem('token');
// const token = '28|5DhOBSTO1XwBaOaF6CabVl1igaWfXsRsVC59sTIu';

export const axiosClient = axios.create(
    {
        baseURL: 'https://api.instade.io/api/v1/',
        // baseURL: 'http://localhost:8000/api/v1/',
        // timeout: 1000,
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    }
);