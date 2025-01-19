const schoolRoutes = require('express').Router();
const SchoolController = require('../controllers/SchoolController');
const { loginValidator } = require('../validators/SchoolValidator');

schoolRoutes.post('/login', loginValidator, SchoolController.login);

module.exports = schoolRoutes;