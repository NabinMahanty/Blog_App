const { check } = require("express-validator");

const signupValidator = [
  check("name").notEmpty().withMessage("Naam likhye"),
  check("email").isEmail().withMessage("invalid email"),
  check("password"),
];
const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid ")
    .notEmpty()
    .withMessage("Email is required "),
  check("password").notEmpty().withMessage("Password is required"),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
];
module.exports = { signupValidator, signinValidator, emailValidator };
