import axios from 'axios';

const api = axios.create({
    baseUrl: 'http://0.0.0.0:3333',
});

export default api;
