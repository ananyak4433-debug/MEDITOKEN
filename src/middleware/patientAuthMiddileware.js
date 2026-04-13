const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");

const patientProtect = async (req, res, next) => {
  try {

    const token = req.cookies.patientToken;

    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const patient = await Patient.findById(decoded.id).select("-password");

    // console.log("DECODED:", decoded);
    // console.log("ID TYPE:", typeof decoded.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    req.user = patient;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Not authorized", error: error.message });
  }
};

module.exports = patientProtect;