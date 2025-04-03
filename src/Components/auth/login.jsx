// 
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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      console.log('API Response:', response.data); 
      console.log('Token received:', response.data.token); // Debugging: Check the token
      localStorage.setItem('token', response.data.accessToken);
      console.log('Token stored in localStorage:', localStorage.getItem('token')); // Debugging: Confirm storage

      navigate('/dashboard');
    } catch (err) {
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
        <Input
          label="Username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-button-container">
          <Button label="Login" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;