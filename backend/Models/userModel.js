const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    friends: {
        type: Array,
        default: [],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be longer than 8 characters'],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    avatar: {
        public_id: {
            type: String,
            
        },
        url: {
            type: String,
            
        },
    },
    location: {
        type: String,
        required: [true, 'Please enter your location'],
        default: 'Not specified',
    },
    occupation: {
        type: String,
        required: [true, 'Please enter your occupation'],
        default: 'Not specified',
    },
    viewedProfile: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

module.exports = mongoose.model("User", userSchema);