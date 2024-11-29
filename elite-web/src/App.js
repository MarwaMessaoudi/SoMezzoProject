import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from "./inscription/RegistrationForm";
import ConfirmationPage from "./inscription/ConfirmationPage";
import Homepage from "./home/HelloWorld";
import Login from "./login/Login";
import ResetPass from "./login/ResetPass";
import React, { useState, useEffect } from 'react';
import CompteValide from "./Interface/Tovalidate"; // Import AddForm here
import UserTable from "./Interface/supprission_page";
import UserList from "./Interface/modification";
import EditUserForm from "./Interface/EditUserForm";
import Dashboard from "./Interface/dashboard";
import AddForm from "./Interface/AddForm"; // Import AddForm here
import AddCall from "./Interface/CRUD calls/add_call"; // Assurez-vous que le chemin est correct


import CallsList from "./Interface/CRUD calls/calls_list"


//import ProtectedLayout from "./utils/ProtectedLayout";

const onLogout = () => {
  // Clear tokens from localStorage and sessionStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};
//<Route path="/ManagerInterface" element={<ProtectedLayout requiredRole="ROLE_EMPLOYEE"><ManagerInterface/></ProtectedLayout>}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<Homepage />}  />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route path='/dashboard' element={<Dashboard onLogout={onLogout}/>} />
        <Route path="/edit-user/:id" element={<EditUserForm />} />
        <Route path="/validate" element={<CompteValide onLogout={onLogout} />} />
        <Route path="/Dashboard" element={<Dashboard onLogout={onLogout} />} />
        <Route path="/add" element={<AddForm />} /> {/* Add route for AddForm */}
        <Route path="/Tovalidate" element={<CompteValide onLogout={onLogout} />} />
        <Route path="/UserTable" element={<UserTable />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-call" element={<AddCall />} />

        <Route path="/call_list" element={<CallsList />} />


        </Routes>
    </Router>
  );
}

export default App;