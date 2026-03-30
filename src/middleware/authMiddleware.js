const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");

const Protect = async (req, res, next) => {
  const token = req.cookies.staffToken;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const staff = await Staff.findById(decoded.id).select("-password");

    if (!staff) {
      return res.status(401).json({ message: "Staff not found" });
    }

    req.user = staff; // ✅ FULL OBJECT
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = Protect;