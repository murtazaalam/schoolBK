const schoolRoutes = require('express').Router();
const SchoolController = require('../controllers/SchoolController');
const { loginValidator } = require('../validators/SchoolValidator');
const TeacherController = require('../controllers/TeacherController')

schoolRoutes.post('/login', loginValidator, SchoolController.login);
schoolRoutes.post('/teacher_login', loginValidator, TeacherController.login);

module.exports = schoolRoutes;