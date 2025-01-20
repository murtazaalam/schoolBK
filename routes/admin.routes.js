const adminRoutes = require('express').Router();
const AdminController = require("../controllers/AdminController");
const { adminAuthValidate } = require('../middleware/AuthValidator');
const { newSchoolValidator } = require("../validators/SchoolValidator");
const { registerValidator, loginValidator } = require('../validators/AdminValidator');
const { teacherAuthValidate } = require("../middleware/TeacherValidator");
const { newTeacherValidator } = require("../validators/TeacherValidator");

adminRoutes.post('/login', loginValidator, AdminController.login);
adminRoutes.post('/register', registerValidator, AdminController.register);
adminRoutes.post('/school', adminAuthValidate, newSchoolValidator, AdminController.addSchool);
adminRoutes.post('/teacher', teacherAuthValidate, newTeacherValidator, AdminController.addTeacher);

module.exports = adminRoutes;