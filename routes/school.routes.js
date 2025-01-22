const schoolRoutes = require('express').Router();
const SchoolController = require('../controllers/SchoolController');
const { schoolAuthValidate } = require('../middleware/AuthValidator');
const { loginValidator, newTeacherValidator, newStudentValidator } = require("../validators/FieldValidator");


schoolRoutes.post('/login', loginValidator, SchoolController.login);
schoolRoutes.post('/teacher', schoolAuthValidate, newTeacherValidator, SchoolController.addTeacher);
schoolRoutes.post('/student', schoolAuthValidate, newStudentValidator, SchoolController.addStudent);

module.exports = schoolRoutes;