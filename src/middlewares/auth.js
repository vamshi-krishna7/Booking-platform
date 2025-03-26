const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const authenticateUser = async (req, res, next) => {
  try {
    console.log("process.env.ACCESS_SECRET-----", process.env.ACCESS_SECRET);
    // Get token from headers
    const token = req.header("Authorization")?.split(" ")[1]; // Expecting "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    // Fetch user from DB (optional but recommended)
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("🚀 ~ authenticateUser ~ error:", error)
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateUser;
