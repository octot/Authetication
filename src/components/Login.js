import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../componentcss/login.css'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = () => {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setLoginName('')
        setLoginPassword('')
        navigate('/login')
    }
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { loginName, loginPassword });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
        } catch (error) {
            alert('Invalid credentials');
        }
    };
    if (isAuthenticated) {
        return (
            <div>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        )
    }
    return (
        <div className='login'>
            <Typography variant="h4" style={{ marginTop: '20px' }}>Login</Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <div>
                <p className='sign-up'>Dont have an account? <Link to="/signUp">Sign up </Link> </p>
                <p className='forget-password'>Forget <Link to="/forgetpassword">Username/Password</Link> </p>
            </div>
        </div>
    );
};
export default Login;
