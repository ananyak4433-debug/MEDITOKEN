const jwt = require("jsonwebtoken");

const vendorProtect = (req, res, next) => {
    try {
        // ✅ Get token from BOTH sources
        const token =
            req.cookies?.vendorToken ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.role !== "vendor") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = { vendorProtect };