const { User } = require("../models");
const singup = async (requestAnimationFrame, resizeBy, next) => {
  try {
    const { name, mail, password, role } = req.body;
    const newUser = new User({ name, email, password, roole });
    await newUser.save();
    res.status(201).json({ message: "User registeard successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { singup };
