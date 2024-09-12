import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("emailData", email)
            const response = await axios.post('http://localhost:3001/forgot-password', { email });
            console.log("response", response)
            alert('Password reset email sent');
        } catch (error) {
            console.error("errorfromforgotpassword", error)
            alert('User Email  not found try creating user with the given mail id    ');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                margin="normal"
                variant="outlined"
            />
            <Button type="submit">Send Reset Email</Button>
            <Box mt={2}>
                <Link to="/">Login</Link>
            </Box>
        </form>
    );
}

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("match.params.token ", match.params.token);
            await axios.post(`http://localhost:3001/reset-password/${token}`, { newPassword });
            alert('Password has been reset');
        } catch (error) {
            console.log("error from resetting password", error);
            alert('Error resetting password');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <div>
                <Link to="/">Back to Home</Link>
            </div>
        </div>

    );
}

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/change-password', { currentPassword, newPassword });
            alert('Password has been changed');
        } catch (error) {
            alert('Error changing password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
            />
            <button type="submit">Change Password</button>
        </form>
    );
}

export { ForgotPassword, ResetPassword, ChangePassword };
