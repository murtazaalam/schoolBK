const teacherRoutes = require('express').Router();
const { loginValidator } = require("../validators/FieldValidator");
const TeacherController = require('../controllers/TeacherController');

teacherRoutes.post('/login', loginValidator, TeacherController.login);

module.exports = teacherRoutes;