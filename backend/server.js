const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const User = require('./models/User')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb+srv://user:user@cluster0.syund4p.mongodb.net/Authentication', { useNewUrlParser: true, useUnifiedTopology: true });
// Register endpoint
app.post('/register', async (req, res) => {
    const { registeredName, registeredPassword, email } = req.body;
    // console.log("registeredName ", registeredName)
    if (!registeredName || !registeredPassword) {
        return (res.status(400).send('Username and password required'))
    }
    try {
        const existingRegisteredUser = await User.findOne({ name: registeredName })
        // console.log("existingRegisteredUser ", existingRegisteredUser)
        if (existingRegisteredUser) {
            return res.status(400).send('UserName already exist')
        }
        const hashedPassword = await bcrypt.hash(registeredPassword, 10);
        const user = new User({ name: registeredName, password: hashedPassword, email: email });
        // console.log("user ", user)
        await user.save();
        res.status(201).send('User created');
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('UserName already exist')
        }
        return res.status(500).send('Internal Server Error')
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { loginName, loginPassword } = req.body;
    const user = await User.findOne({ name: loginName });
    if (!user) {
        return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(loginPassword, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send('User not found')
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aajaykumarr32@gmail.com',
            pass: 'zjpslnqyldqexent'
        }
    })
    const mailOptions = {
        to: user.email,
        from: 'aajaykumarr32@gmail.com',
        subject: 'Password Reset',
        text: `Please click on the following link to reset your password: http://localhost:3000/reset-password/${token}`
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).send('Error sending email due to mail options');
        }
        res.status(200).send('Email sent');
    });
})
app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).send('Password reset token is invalid or has expired');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).send('Password has been reset');
    }
    catch (error) {
        res.status(500).send('Server error');
    }
})
app.post('/change-password', async (req, res) => {
    const { name, currentPassword, newPassword } = req.body;
    const user = await User.findOne(name); // Assuming you have user ID in req.user
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).send('Current password is incorrect');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send('Password has been changed');
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
