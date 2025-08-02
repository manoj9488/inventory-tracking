import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function dashboard() {
  const navigate = useNavigate();
  return (
    <div>
    <div>dashboard</div>
    <button onClick={() => navigate('/')}>Logout</button>
    </div>
  )
}
    
                          