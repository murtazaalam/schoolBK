const adminRoutes = require('express').Router();
const AdminController = require("../controllers/AdminController");
const { adminAuthValidate } = require('../middleware/AuthValidator');
const { newSchoolValidator } = require("../validators/FieldValidator");
const { registerValidator, loginValidator } = require('../validators/AdminValidator');

adminRoutes.post('/login', loginValidator, AdminController.login);
adminRoutes.post('/register', registerValidator, AdminController.register);
adminRoutes.post('/school', adminAuthValidate, newSchoolValidator, AdminController.addSchool);
adminRoutes.post('/user',adminAuthValidate, AdminController.addUser);
adminRoutes.put('/user/:id', adminAuthValidate, AdminController.updateUser);
adminRoutes.delete('/user/:id', adminAuthValidate, AdminController.deleteUser);

module.exports = adminRoutes;