import axios from 'axios';
import { updateObject } from '../shared/utility';
import { apiBaseUrl } from './axiosAuth';

const instance = axios.create({
    baseURL: `${apiBaseUrl}/users/`,
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