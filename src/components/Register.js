import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../componentcss/register.css'
const Register = () => {
    const [registeredName, setRegisteredName] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');
    const [email, setEmail] = useState('');

    const register = async () => {
        try {
            await axios.post('http://localhost:3001/register', { registeredName, registeredPassword, email });
            alert('User created');
            setRegisteredName('');
            setRegisteredPassword('');
            setEmail('');
        } catch (error) {
            alert('Error in registering');
            console.error(error);
        }
    };

    return (
        <div className='register'>
            <Typography variant="h4">Register</Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={registeredPassword}
                onChange={(e) => setRegisteredPassword(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={register}>
                Register
            </Button>
            <div>
                <p className='login'>Already a user <Link to="/">login</Link></p>
            </div>
        </div>
    );
};

export default Register;
