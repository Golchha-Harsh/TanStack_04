// Components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
//Why this file Private Route we have created because if u look into app.jsx you will find out Inside private route component we have Dashboard Component beacuse I want to cross check If user login than only he will be able to access dashboard
function PrivateRoute({ children }) {
  //It will check for the token at local storage if it presents it will display dashboard pannel at its endpoint /dashboard or again login
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;