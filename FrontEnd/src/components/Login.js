import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
          setError('Email and Password are required!');
          return;
        }
            setError('');
    
        try {
          console.log("logininfo", email, password);
    
          let result = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!result.ok) {
            const errorData = await result.json();
            throw new Error(errorData.message || 'Failed to log in. Please try again later.');
          }
    
          result = await result.json();
              if (result.email) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
          } else {
            setError('Invalid email or password. Please try again.');
          }
    
        } catch (error) {
          console.error('Login error:', error);
          setError(error.message || 'Something went wrong. Please try again later.');
        }
      };

    return (
        <div className='login'>
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login