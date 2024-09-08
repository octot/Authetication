import React, { useState } from 'react';
import axios from 'axios';

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
            console.error("errorfromforgotpassword", error.response.data)
            alert('User Email  not found try creating user with the given mail id    ');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send Reset Email</button>
        </form>
    );
}

function ResetPassword({ match }) {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/reset-password/${match.params.token}`, { newPassword });
            alert('Password has been reset');
        } catch (error) {
            alert('Error resetting password');
        }
    };

    return (
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
