const jwt = require("jsonwebtoken");

const adminProtect = (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, admin token missing"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Role check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only"
      });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired admin token"
    });
  }
};

module.exports = adminProtect;
