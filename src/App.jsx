import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/auth/login';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    // /login will render login page at /login endpoint
    // /dashboard whenever we will navigate to dashboard /dashboard it is inside wrapped in Private Route
    //  means it will check first if token is present or not in local storage in order to find out if user is logged in if it is then only nnavigate it to the dashboard
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;