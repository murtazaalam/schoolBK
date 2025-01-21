const studentRoutes = require('express').Router();
const StudentController = require('../controllers/StudentController');
const { loginValidator } = require('../validators/SchoolValidator');

studentRoutes.post('/login', loginValidator, StudentController.login)

module.exports = studentRoutes;
