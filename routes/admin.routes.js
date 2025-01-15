const adminRoutes = require('express').Router();
const AdminController = require("../controllers/AdminController");
const { registerValidator, loginValidator } = require('../validators/AdminValidator');

adminRoutes.post('/register', registerValidator, AdminController.register);
adminRoutes.post('/login', loginValidator, AdminController.login);

module.exports = adminRoutes;