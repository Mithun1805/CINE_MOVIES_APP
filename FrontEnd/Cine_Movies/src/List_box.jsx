import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Loginpage.jsx'

function List_box({isOpen}) {
    const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
}


  return (
    <div className={`listbox ${isOpen ? 'active' : ''}`}>
      <p>username</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default List_box