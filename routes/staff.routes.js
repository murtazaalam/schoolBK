const staffRoutes = require('express').Router();
const StaffController = require('../controllers/StaffController');
const { loginValidator } = require("../validators/FieldValidator");

staffRoutes.post('/login', loginValidator, StaffController.login);

module.exports = staffRoutes;
