const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");

router.post("/signup", authController.singup);

module.exports = router;
