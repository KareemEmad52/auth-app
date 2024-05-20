import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be above 18']
    }
})

export const userModel = mongoose.model('user', userSchema)