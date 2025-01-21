const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentDetails = new Schema({
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
    school:{
        type: Schema.Types.ObjectId, 
        ref: 'school', 
        required: true
    },
    address: {
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
        unique: true,
        required: false,
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
    },
    updated_at:{
        type: Date,
        unique: false,
        required: false,    
    }
})

module.exports = mongoose.model('student', StudentDetails);