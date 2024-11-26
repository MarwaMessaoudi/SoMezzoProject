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
import EmployeeInterface from './interface/Employee/employeeInterface';
import Controller from './interface/controller/controller';
import CompteValide from './valide/compteValide';
import { jwtDecode } from 'jwt-decode';

/*const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const expirationTime = decodedToken.exp * 1000; // Token expiry time in milliseconds
      if (expirationTime >= Date.now()) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Token error", error);
      isAuthenticated = false;
    }
  }

  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};*/
const onLogout = () => {
  // Clear tokens from localStorage and sessionStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<Homepage />}  />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route path="/employeeinterface" element={<EmployeeInterface />} /> 
        <Route path="/UpdateEmp" element={<UpdateEmp />} />
        <Route path="/ManagerInterface" element={<ManagerInterface />} />
      <Route path="/users-profile" element={<ProfilePage />} />
      <Route path="/UserTable" element={<UserTable />} />       /* supprission*/
      <Route path="/users" element={<UserList />} />    /* modification*/
      <Route path="/edit-user/:id" element={<EditUserForm />} /> /*formulaire_modification*/
        <Route path="/employeeinterface" element={<EmployeeInterface onLogout={onLogout} />} />
        <Route path="/controller" element={<Controller onLogout={onLogout}/>} />
        <Route path='/validate' element={<CompteValide />} />
      </Routes>
    </Router>
  );
}

export default App;
