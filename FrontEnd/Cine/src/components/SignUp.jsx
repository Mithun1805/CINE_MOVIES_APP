import React from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";

function SignUp() {
    const { control } = useForm();
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
              <button >Sign In</button>
            </div>



        </div>
    </div>
  )
}

export default SignUp
