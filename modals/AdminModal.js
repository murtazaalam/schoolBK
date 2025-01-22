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
        required: false
    },
    created_at:{
        type: Date,
        unique: false,
        required: false
    }
})

module.exports = mongoose.model('admin', Admin);