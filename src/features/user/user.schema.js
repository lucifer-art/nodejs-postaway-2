import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters"]
    },
    avatar: {
        type: String
    },
    tokens: [{ type: String}]
}, {timestamp: true})

export const User = mongoose.model("User", userSchema);