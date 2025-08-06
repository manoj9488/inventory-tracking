import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserInfo from "./components/userInfo";



function App() {
  return (
    
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>} /> 
         <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    
  );
}

export default App;
