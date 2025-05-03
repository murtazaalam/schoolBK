const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    school_id: {
        type: String,
        unique: true
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
        required: true
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
        default: new Date,
    }
});
School.pre('save', async function (next) {
    if (this.isNew) {
      const lastSchool = await this.constructor.findOne().sort({ school_id: -1 });
      let newId = 1;
      if (lastSchool && lastSchool.school_id) {
        const lastNumber = parseInt(lastSchool.school_id.replace('ETS', ''), 10);
        newId = lastNumber + 1;
      }
      this.school_id = 'ETS' + String(newId).padStart(4, '0');
    }
    next();
  });

module.exports = mongoose.model('school', School);