import axios from 'axios';
//This is where i am config axios instance
//axios.create() is a method that allows you to create a new axios object with custom default settings  
const api = axios.create({
  baseURL: 'https://67eb9aacaa794fb3222ad9c2.mockapi.io/users', //why i am mentioning baseURL means whenever I want to fetch all users I can simply get api.get('/users') instead of typing url complete
});
//Concept of interceptors These are functions that can be executed automatically before a request is sent 
//So let us suppose we have stored token already inside local storage question is that why we need it to store inside Authorization Headers reason is How do api will verify user identity if it is already login or not as sir told us
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      //If token exist inside local storage then we are adding authheaders with token alse error beacuse it returns promise 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;