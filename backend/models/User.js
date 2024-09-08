const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

const User = mongoose.model('registeredUsers', UserSchema);

module.exports = User;
