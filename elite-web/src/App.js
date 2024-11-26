import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from "./inscription/RegistrationForm";
import ConfirmationPage from "./inscription/ConfirmationPage";
import Homepage from "./home/HelloWorld";
import Login from "./login/Login";
import ResetPass from "./login/ResetPass";
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import EmployeeInterface from './Interface/Employee/employeeInterface';
import UpdateEmp from './Interface/Employee/UpdateEmp';
import ManagerInterface from "./Interface/Manager/managerInterface"; 
import ProfilePage from "./Interface/Manager/users-profile"; 
import UserTable from "./Interface/Manager/supprission_page"; 

import UserList from "./Interface/Manager/supprission_page";
import EditUserForm from "./Interface/Manager/EditUserForm";





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
        <Route path="/login" element={<LoginPage sessionExpired={sessionExpired} />}/>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/sign-in" />}/>
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route path="/employeeinterface" element={<EmployeeInterface />} /> 
        <Route path="/UpdateEmp" element={<UpdateEmp />} />


        <Route path="/ManagerInterface" element={<ManagerInterface />} />

      <Route path="/users-profile" element={<ProfilePage />} />
      <Route path="/UserTable" element={<UserTable />} />       /* supprission*/


      <Route path="/users" element={<UserList />} />    /* modification*/
      <Route path="/edit-user/:id" element={<EditUserForm />} /> /*formulaire_modification*/
      </Routes>
    </Router>
  );
}

export default App;
