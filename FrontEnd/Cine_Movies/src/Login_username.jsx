import React from 'react'
import { useNavigate } from "react-router-dom"

function Login_username() {
  const navigate = useNavigate();

  const handlelogin = () => {
    localStorage.setItem("isLoggedIn","true");
    navigate("/home");
  }


  return (
    
        <div className="logindiv">
            <div className="heading">
                <h1>Welcome Back</h1>
                <p>Sign in to Continue with CineMatch</p>

            </div>
            <div className="inps">
              <p>Email or Username</p>
              <input type="text" placeholder="Enter your Email or Username"/>
              <p>Password</p>
              <input type="password" placeholder="Enter the Password" /><br />
              <button onClick={handlelogin}>Sign In</button>
            </div>
            <div className="lastcol">
              <p>New to CineMatch?</p>
              <p className="signup">Sign Up Now</p>
            </div>



        </div>

      
    
  )
}

export default Login_username
