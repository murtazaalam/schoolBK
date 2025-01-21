const schoolRoutes = require('express').Router();
const AdminController = require('../controllers/AdminController');
const SchoolController = require('../controllers/SchoolController')
const { loginValidator } = require('../validators/SchoolValidator');
const { newTeacherValidator } = require("../validators/TeacherValidator");
const { schoolAuthValidate } = require('../middleware/AuthValidator');


schoolRoutes.post('/login', loginValidator, SchoolController.login);
schoolRoutes.post('/teacher', schoolAuthValidate, newTeacherValidator, AdminController.addTeacher);
schoolRoutes.post('/student', schoolAuthValidate, AdminController.addStudent);

module.exports = schoolRoutes;