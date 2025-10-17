const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../config/kyes");

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization header required" });
    }

    // Handle both "Bearer token" and just "token" formats
    const parts = authorization.split(" ");
    const token = parts.length > 1 ? parts[1] : parts[0];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    // Verify token only once
    const payload = jwt.verify(token, jwtsecret);

    // Store user info in request object
    req.user = {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    // Call next() exactly once
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuth;
