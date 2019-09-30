import axios from 'axios';
import { updateObject } from '../shared/utility';

const instance = axios.create({
    baseURL: 'https://localhost:44387/user-time-zones/',
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers = updateObject(config.headers, {
        'Authorization': 'Bearer ' + token
    });

    return config;
});

export default instance;