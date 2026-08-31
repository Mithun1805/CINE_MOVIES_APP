import React from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'

function SignUp() {
    const { control } = useForm();
    const navigate = useNavigate()
    const backtologin = () => {
      navigate("/")
    }
  return (
    <div className="login-page">
    <div className="logimage"> 

              <div className="logindiv">
            <div className="heading">
                <h1>Welcome</h1>
                <p>Create Account to Continue with CineMatch</p>

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
              placeholder="Enter password"
              width="400px"

              />

              <p>Re-Enter Password</p>
              <TextField
              type="password"
              name="password2"
              control={control}
              placeholder="Enter password"
              width="400px"

              />
              <button  onClick={backtologin}>Create an Account</button>
            </div>



        </div>
    </div>
    </div>
  )
}

export default SignUp
