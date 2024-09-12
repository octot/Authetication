import { Container } from '@mui/material';
import React, { useState } from 'react';
import '../componentcss/Authentication.css';
import Login from '../components/Login';
import Register from '../components/Register';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChangePassword, ForgotPassword, ResetPassword } from '../components/handlingPasswords';
const Authentication = () => {
    const { token, setToken } = useState('')
    return (
        <Container
            className='authenticate-main'>
            <Router>
                <Routes>
                    <Route path="/signUp" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/forgetpassword" element={<ForgotPassword />} />
                    <Route path="/logout" element={<Login />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    {/*
                    <ResetPassword />
                    <ChangePassword /> */}
                </Routes>
                <nav>
                    {/* <Link to="/signUp">New Sign up here</Link>
                    <Link to="/forgetpassword">Forgot password</Link> */}
                </nav>
            </Router>
        </Container>
    );
}
export default Authentication