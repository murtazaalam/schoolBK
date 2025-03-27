const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    phone: {
        type: Number,
        unique: true,
        required: false
    },
    
    address: {
        type: String,
        unique: false,
        required: false
    },
    status: {
        type: String,
        unique: false,
        default: "active",
        required: false
    },
    role: {
        type: String,
        enum: ["school","student", "teacher", "staff"],
        required: true
    },
    token:{
        type: String,
        default: "",
    },
    password:{
        type: String,
        unique: false,
        required: true
    },
    updated_at:{
        type: Date,
        unique: false,
        required: false,
        default: new Date()
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: false
    },
    created_at:{
        type: Date,
        unique: false,
        required: false,
        default: new Date(),
    },
    created_by: {
        type: Schema.Types.ObjectId,
        unique: false,
        required: true
    },
})

module.exports = mongoose.model('user', User);