const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../config/kyes");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    jwtsecret,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

module.exports = generateToken;
