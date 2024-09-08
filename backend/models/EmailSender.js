const User = require('./User')
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log("email ", email)
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send('User not found')
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 7200000; // 1 hour
    await user.save();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aajaykumarr32@gmail.com',
            pass: 'Ajay*123'
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
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent');
    });
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).send('Password has been reset');
})
router.post('/change-password', async (req, res) => {
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
module.exports = router;


