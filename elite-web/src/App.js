import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from "./inscription/RegistrationForm";
import ConfirmationPage from "./inscription/ConfirmationPage";
import Homepage from "./home/HelloWorld";
import Login from "./login/Login";
import ResetPass from "./login/ResetPass";
import { isTokenExpired } from './utils/auth'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is a valid token in localStorage or sessionStorage
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (accessToken && !isTokenExpired(accessToken)) {
      setIsAuthenticated(true);
    } else {
      // If the token is expired or missing, log the user out
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="sign-in" />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
