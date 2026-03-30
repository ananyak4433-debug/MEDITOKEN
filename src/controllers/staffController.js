const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.staffLogin = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: staff._id, role: "staff" },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("staffToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Staff login successful"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};