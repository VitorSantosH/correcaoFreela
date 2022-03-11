import axios from 'axios';

const api = axios.create({
    baseURL: '/',
    
})

api.defaults.headers['token'] = localStorage.getItem('token')

export default api 