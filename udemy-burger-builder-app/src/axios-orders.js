import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-b395b.firebaseio.com/'
});

export default instance;