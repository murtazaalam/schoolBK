const { body, validationResult, oneOf } = require("express-validator");

exports.newSchoolValidator = [
    body("name").notEmpty()
                .withMessage("Name Is Required"),
                // .isAlpha()
                // .withMessage("Invalid Name"),
    // body("email").notEmpty()
    //              .withMessage("Email Is Required")
    //              .isEmail()
    //              .withMessage("Invalid Email"),
    // body("phone").isMobilePhone("en-IN").withMessage("Invalid Phone Number"),
    oneOf([
        body("email").notEmpty()
                     .withMessage("Email Is Required")
                     .isEmail()
                     .withMessage("Invalid Email"),
        body("phone").notEmpty()
                     .withMessage("Name Is Required")
                     .isMobilePhone("en-IN").withMessage("Invalid Phone Number")
    ]),
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
                 .withMessage("Email Is Required"),
    body("password").notEmpty()
                    .withMessage("Password Is Required"),
    async(req, res, next) => {
        let error = validationResult(req);
        error = error.array();
        if(error.length > 0) return res.status(400).json({error:error})
        next()
    }
]