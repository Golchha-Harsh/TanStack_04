import React, { useState } from 'react';
import './LoginPage.css';
import Input from './common/Input';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();//This is The Hook which basically gonna help me in navigating in dashboard page

  const handleLogin = async (e) => {
    e.preventDefault();//So this line will help me in whenever I submit form it prevents it default form page submission which cause page to reload
    setError(''); //Clearign existing error when I already attempts some login it will set it to Blank
    //This is main my login process idea
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {//This is main api req we are hitting endpoint with username and pass that I have entered
        username,
        password,
      });
      //After API Successfuly Fetched data I am consoling response which is an object res.data is basically accessing data from that res object
      console.log('API Response:', response.data);
      //Consoling access token that I have received from the API after successful Login
      console.log('Token received:', response.data.accessToken);
      //Into local storage storing token = my access token that I have received sometimes we also store them inside session storage or in cookies as ritik sir told us in session
      localStorage.setItem('token', response.data.accessToken);
      console.log('Token stored in localStorage:', localStorage.getItem('token')); //This line basically I am debugging if My token is stored into local storage or not
      //Then after successfully storing and login navigating user to dashboard endpoint
      navigate('/dashboard');
    } catch (err) {
      //if user enters wrong pass or credential I will setError()which is state setting error=err.res.data.message and I also mentioned one fallback message if from resp I dont get any error message
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <Input label="Username" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <Input label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-button-container">
          <Button label="Login" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;