import React,{useState} from 'react'
import TextField from './forms/MytextField'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import api from "./forms/Axios";

function SignUp() {
    const { control, handleSubmit } = useForm({
    defaultValues: {
      username:"",
        email: "",
        password: "",
        password2: "",
    },
});
const [wrong,setWrong] = useState(true)
const wrongname = () => {
      setWrong(false)
    }
    const navigate = useNavigate()
    const backtologin = () => {
        navigate("/");
    };

    const onSubmit = async (data) => {
        console.log(data);
        console.log(data.password)
        console.log(data.password2)
        if (data.password == data.password2){
          setWrong(true)
              try {
        const response = await api.post("/signup/", {
            username:data.username,
            email: data.email,
            password: data.password,
        });

        console.log("Server:", response.data);

        navigate("/");
    } catch (error) {
        console.error("Signup error:", error);
    }
        }
        else{
          setWrong(false)
        }
    };
  return (
    <div className="login-page">
    <div className="logimage"> 

              <div className="logindiv">
            <div className="heading">
                <h1>Welcome</h1>
                <p>Create Account to Continue with CineMatch</p>

            </div>
            <div className="inps">
              <p>Username</p>
              <TextField
              type="text"
              name="username"
              control={control}
              placeholder="Enter Your Email"
              width="400px"

              />
              <p>Enter Your Email</p>
              <TextField
              type="Email"
              name="email"
              control={control}
              placeholder="Enter Your Email"
              width="400px"

              />
              <p onClick={wrongname}>Password</p>
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
              {wrong?<p style={{
        display:"none"
      }}></p> :
      <p style={{marginTop:"2px",
        color:"red"}}>Password Mismatched</p>
      }
              <button onClick={handleSubmit(onSubmit)}>
    Create an Account
</button>
            </div>



        </div>
    </div>
    </div>
  )
}

export default SignUp
