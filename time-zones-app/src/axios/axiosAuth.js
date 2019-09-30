import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44387/auth/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;