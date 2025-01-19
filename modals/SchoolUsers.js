const mongoose = require("mongoose");

const schoolUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Teacher", "Student"], 
  },
  schoolName: {
    type: String,
    required: true,
    trim: true,
  },
  activationDate: {
    type: Date,
    required: true,
  },
  deactivationDate: {
    type: Date, 
  },
  logo: {
    type: String, 
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true, 
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model("schooluser", schoolUserSchema);
