import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        return <h1>Welcome</h1>;
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
        </div>
    );
};

export default Login;
