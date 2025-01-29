const schoolRoutes = require('express').Router();
const SchoolController = require('../controllers/SchoolController');
const { schoolAuthValidate } = require('../middleware/AuthValidator');
const { loginValidator, newTeacherValidator, newStudentValidator, newStaffValidator } = require("../validators/FieldValidator");


schoolRoutes.post('/login', loginValidator, SchoolController.login);
schoolRoutes.post('/teacher', schoolAuthValidate, newTeacherValidator, SchoolController.addTeacher);
schoolRoutes.put('/teacher/:id', schoolAuthValidate, newTeacherValidator, SchoolController.updateTeacher);
schoolRoutes.delete('/teacher/:id', schoolAuthValidate, SchoolController.deleteTeacher);
schoolRoutes.get('/teacher', schoolAuthValidate, SchoolController.getAllTeachers);

schoolRoutes.post('/student', schoolAuthValidate, newStudentValidator, SchoolController.addStudent);
schoolRoutes.put('/student/:id', schoolAuthValidate, newStudentValidator, SchoolController.updateStudent);
schoolRoutes.delete('/student/:id', schoolAuthValidate, SchoolController.deleteStudent);
schoolRoutes.get('/student', schoolAuthValidate, SchoolController.getAllStudents);

schoolRoutes.post('/staff', schoolAuthValidate, newStaffValidator, SchoolController.addStaff);
schoolRoutes.put('/staff/:id', schoolAuthValidate, newStaffValidator, SchoolController.updateStaff);
schoolRoutes.delete('/staff/:id', schoolAuthValidate, SchoolController.deleteStaff);
schoolRoutes.get('/staff', schoolAuthValidate, SchoolController.getAllStaffs);

module.exports = schoolRoutes;