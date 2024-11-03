import axios from 'axios';

export const apiBaseUrl = "http://localhost:5000";

const instance = axios.create({
    baseURL: `${apiBaseUrl}/auth/`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;