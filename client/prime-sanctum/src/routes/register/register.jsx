
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {

  const [error,setError]= useState("");
  const [isLoading,setIsLoading]=useState(false);

  const navigate= useNavigate()

  const handleSubmit= async (e)=>{
   

    e.preventDefault()

    setIsLoading(true);

    setError("");

    const formData= new FormData(e.target);

    const username= formData.get("username");
    const email= formData.get("email");
    const password= formData.get("password");


    try{

    const res=await apiRequest.post("/auth/register",{  
      username,email,password
    })

   navigate("/login")
  }catch(err){
    
    //console.log(err.response.data.message);

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setError(err.response.data.message);
    } else if (err.request) {
      // The request was made but no response was received
      setError("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      setError("Error setting up the request.");
    }

  }finally{
    setIsLoading(false);
  }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && (<span>{error}</span>)}

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
