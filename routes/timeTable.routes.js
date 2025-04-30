const timeTableRoutes = require('express').Router();
const TimeTableController = require('../controllers/TimeTableController');
const { schoolAuthValidate } = require('../middleware/AuthValidator');
const { loginValidator} = require("../validators/FieldValidator");

timeTableRoutes.post('/add-time-table', schoolAuthValidate, TimeTableController.addTimeTable);
timeTableRoutes.get('/time-table', schoolAuthValidate, TimeTableController.getTimeTable);
