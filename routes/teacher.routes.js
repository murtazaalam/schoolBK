const teacherRoutes = require('express').Router();
const { loginValidator } = require('../validators/SchoolValidator');
const TeacherController = require('../controllers/TeacherController');

teacherRoutes.post('/login', loginValidator, TeacherController.login);

module.exports = teacherRoutes;