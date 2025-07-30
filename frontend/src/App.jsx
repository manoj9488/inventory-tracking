import { useState } from 'react'
import register from './components/Register.jsx'
import {Route, Routes} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text"placeholder='Enter your name' />
      <label htmlFor="email"></label>
      <input type="email" placeholder='Enter your email' />
      <label htmlFor="password"></label>
      <input type="password" placeholder='Enter your password' />
      <button>Register</button>

      <Routes>
        <Route path="/register" element={<register />} />

      </Routes>

        
    </div>
  )
}

export default App
