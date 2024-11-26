import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from "./inscription/RegistrationForm";
import ConfirmationPage from "./inscription/ConfirmationPage";
import Homepage from "./home/HelloWorld";
import Login from "./login/Login";
import ResetPass from "./login/ResetPass";
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

const INACTIVITY_TIMEOUT = 1 * 60 * 1000; // 10 minutes

function App() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setSessionExpired(true);
        alert('Your session has expired. Please log in again.');
        setIsAuthenticated(false);
      }, INACTIVITY_TIMEOUT);
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage sessionExpired={sessionExpired} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/sign-in" />}
        />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
