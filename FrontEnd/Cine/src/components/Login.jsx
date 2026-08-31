
import React,{useState} from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { Margin } from '@mui/icons-material';

function Login() {
    const navigate = useNavigate()
    const { control } = useForm();
    const homepage = () => {
        navigate("/home")
    }
    const signup = ()=>{
        navigate("/signup")
    }
    const [wrong,setWrong] = useState(true)

    const wrongname = () => {
      setWrong(false)
    }
    const correctpass = () => {
      setWrong(true)
    }
  return (

    <div className="login-page">
  

    <div className="logimage">

  <div className="logindiv">

    <div className="heading">
      <h1>Welcome Back</h1>
      <p>Sign in to Continue with CineMatch</p>
    </div>

    <div className="inps">

      <p >Email or Username</p>

      <TextField
        type="email"
        name="email"
        control={control}
        placeholder="Enter Your Email"
        width="400px"
      />
      {wrong?<p style={{
        display:"none"
      }}>Wrong Username or Email</p> :
      <p style={{marginTop:"2px",
        color:"red"}}>Wrong Username or Email</p>
      }

      <p onClick={correctpass}>Password</p>

      <TextField
      
        type="password"
        name="password"
        control={control}
        placeholder="Enter Your Password"
        width="400px"
      />

      {wrong?<p style={{
        display:"none"
      }}>Wrong Password</p> :
      <p style={{marginTop:"2px",
        color:"red"
      }}>Wrong Password</p>
      }

      <button onClick={homepage}>
        Sign In
      </button>

    </div>

    <div className="lastcol">
      <p onClick={wrongname}>New to CineMatch?</p>
      <p className="signup" onClick={signup}>
        Sign Up Now
      </p>
    </div>

  </div>

</div>
</div>

  )
}

export default Login

