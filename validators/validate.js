const { validationResult } = require("express-validator");
// const { map } = require("../app");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const mappedErrors = {};

  errors.array().forEach((error) => {
    mappedErrors[error.param || error.path] = error.msg;
  });
  res.status(400).json(mappedErrors);
 };

module.exports = validate;
