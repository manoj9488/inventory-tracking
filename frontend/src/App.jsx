import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/UserDashboard";
import Admindashboard from "./components/AdminDashboard";
import AddProduct from "./components/addproduct";


function App() {
  return (
    
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<Admindashboard />} /> 
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    
  );
}

export default App;
