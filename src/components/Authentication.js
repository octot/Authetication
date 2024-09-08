import { Container } from '@mui/material';
import React from 'react';
import '../componentcss/Authentication.css';
import Login from '../components/Login';
import Register from '../components/Register';
import { ChangePassword, ForgotPassword, ResetPassword } from '../components/handlingPasswords';
const Authentication = () => {

    return (
        <Container sx={{ textAlign: 'center' }}>
            <Register />
            <Login />
            <ForgotPassword />
            <ResetPassword />
            <ChangePassword />
        </Container>
    );
}
export default Authentication