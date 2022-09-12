import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.156:3333',
  timeout: 3000
});

export default api;