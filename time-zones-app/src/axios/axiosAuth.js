import axios from 'axios';

export const apiBaseUrl = "https://localhost:5001";

const instance = axios.create({
    baseURL: `${apiBaseUrl}/auth/`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;