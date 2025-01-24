const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        unique: false,
        default: "active",
        required: false
    },
    token:{
        type: String,
        default: "",
    },
    password:{
        type: String,
        unique: false,
        required: false
    },
    updated_at:{
        type: Date,
        unique: false,
        required: false,
        default: new Date()
    },
    created_at:{
        type: Date,
        unique: false,
        required: false,
        default: new Date()
    }
})

module.exports = mongoose.model('admin', Admin);