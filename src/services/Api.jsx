// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://67eb9aacaa794fb3222ad9c2.mockapi.io/users',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;