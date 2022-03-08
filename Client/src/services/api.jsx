import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    
})

api.defaults.headers['token'] = localStorage.getItem('token')

export default api 