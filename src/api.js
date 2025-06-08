import axios from 'axios';
const api =axios.create({
    baseURL : 'https://backkend-for-pet-app.onrender.com'
});

export default api;