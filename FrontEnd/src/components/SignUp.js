import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        if (!name || !email || !password) {
          setError("All fields are required!");
          return;
        }
     setError("");
    
        try {
          let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
              if (!result.ok) {
            const errorData = await result.json();
            throw new Error(errorData.message || "Something went wrong. Please try again.");
          }
            result = await result.json();
              localStorage.setItem("user", JSON.stringify(result));
    
          navigate("/");
    
        } catch (error) {
          console.error("Error during registration:", error);
          setError(error.message || "Something went wrong. Please try again.");
        }
      };
    



    return (
        <div className="register">
            <h1>Register</h1>
            {error && <div className="error-message">{error}</div>}
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp