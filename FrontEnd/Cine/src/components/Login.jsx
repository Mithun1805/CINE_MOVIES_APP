
import React from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const { control } = useForm();
    const homepage = () => {
        navigate("/home")
    }
    const signup = ()=>{
        navigate("/signup")
    }
  return (
    <div className="logimage"> 
      <img src="" alt="superman" />

              <div className="logindiv">
            <div className="heading">
                <h1>Welcome Back</h1>
                <p>Sign in to Continue with CineMatch</p>

            </div>
            <div className="inps">
              <p>Email or Username</p>
              <TextField
              type="Email"
              name="email"
              control={control}
              placeholder="Enter Your Email"
              width="400px"

              />
              <p>Password</p>
              <TextField
              type="password"
              name="password"
              control={control}
              placeholder="Enter Your Email"
              width="400px"

              />
              <button onClick={homepage} >Sign In</button>
            </div>
            <div className="lastcol">
              <p>New to CineMatch?</p>
              <p className="signup" onClick={signup}>Sign Up Now</p>
            </div>



        </div>
    </div>

  )
}

export default Login

