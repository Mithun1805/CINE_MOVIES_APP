
import React,{useState} from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { Margin } from '@mui/icons-material';
import api from "./forms/Axios";

function Login() {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const homepage = () => {
        navigate("/home")
    }
    const signup = ()=>{
        navigate("/signup")
    }
    const [wrong,setWrong] = useState(true)
    const [success,setSuccess] = useState(false)
    const onSubmit = async (data) => {
    console.log("LOGIN DATA:", data);

    try {
        const response = await api.post("/login/", {
            email: data.email,
            password: data.password,
        });

        console.log("Server:", response.data);

        localStorage.setItem("username", response.data.username);

        navigate("/home");

    } catch (error) {
        console.error("Login error:", error);
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        setWrong(false)
    }
};

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
      }}>Wrong Email or Password</p> :
      <p style={{marginTop:"2px",
        color:"red"}}>Wrong Email or Password</p>
      }

      <p>Password</p>

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

      <button onClick={handleSubmit(onSubmit)}>
        Sign In
      </button>

    </div>

    <div className="lastcol">
      <p>New to CineMatch?</p>
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

