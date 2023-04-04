import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:7000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');