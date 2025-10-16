// const { email } = require("../app");
const { User } = require("../models");
const mongoose = require("mongoose");
// const hashPassword = require("../utils/hashPassword");
const hashPasswordUtil = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");
const hashPassword = require("../utils/hashPassword");
const { pass } = require("../config/kyes");
// const { use } = require("react");
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exist");
    }
    const hashPassword = await hashPasswordUtil(password);
    const newUser = new User({ name, email, password: hashPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registeard successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid Details");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid Password");
    }

    const token = generateToken(user);

    res.status(200).json({ message: "User login Successful", data: { token } });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    // user.isVerified === true is same as user.isVerified
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }

    const code = generateCode(6);

    user.verificationCode = code;
    await user.save();

    // send email
    await sendEmail({
      emailTo: user.email,
      subject: "Email verification code",
      code,
      content: "verify your account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Invalid Code");
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ message: "User verifiaction Successful" });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User Not Found");
    }
    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    // send email for forgot password
    await sendEmail({
      emailTo: user.email,
      subject: "Password Reset Code",
      code,
      content: "reset your password",
    });

    res.status(200).json({
      message: "Password reset code sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 400;
      throw new Error("User Not Found");
    }
    if (user.forgotPasswordCode !== code) {
      res.code = 400;
      throw new Error("Invalid Code");
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();
    res.status(200).json({
      message: "Password recovered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const ChangePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
      res.code = 400;
      throw new Error("Old Password does not match");
    }

    if (oldPassword === newPassword) {
      res.code = 400;
      throw new Error("You are using the same password");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  ChangePassword,
};
