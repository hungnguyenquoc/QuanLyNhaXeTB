import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:13730",
    withCredentials: true
});

export default instance;