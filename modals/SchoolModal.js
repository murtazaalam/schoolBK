const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new Schema({
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
    city: {
        type: String,
        unique: false,
        required: false
    },
    state: {
        type: String,
        unique: false,
        required: false
    },
    status: {
        type: String,
        unique: false,
        default: null,
        required: false
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
    created_at:{
        type: Date,
        unique: false,
        required: false,
        default: new Date,
    }
})

module.exports = mongoose.model('school', School);