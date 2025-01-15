const { body, validationResult } = require("express-validator");

exports.registerValidator = [
    body("name").notEmpty()
                .withMessage("Name Is Required")
                .isAlpha()
                .withMessage("Invalid Name"),
    body("email").notEmpty()
                 .withMessage("Email Is Required")
                 .isEmail()
                 .withMessage("Invalid Email"),
    body("password").notEmpty()
                    .withMessage("Password Is Required")
                    .isStrongPassword()
                    .withMessage("Weak Password"),
    async(req, res, next) => {
        let error = validationResult(req);
        error = error.array();
        if(error.length > 0) return res.status(400).json({error:error})
        next()
    }
]

exports.loginValidator = [
    body("email").notEmpty()
                 .withMessage("Email Is Required")
                 .isEmail()
                 .withMessage("Invalid Email"),
    body("password").notEmpty()
                    .withMessage("Password Is Required"),
    async(req, res, next) => {
        let error = validationResult(req);
        error = error.array();
        if(error.length > 0) return res.status(400).json({error:error})
        next()
    }
]