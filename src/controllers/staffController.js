const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.staffSignup = async (req, res) => {
  console.log("check")
  try {
    const { customId, vendorId, email, password } = req.body;

    if (!customId || !vendorId || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Staff.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Staff already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      customId,
      vendorId,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Staff registered"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



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


exports.getStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).select("-password");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      success: true,
      data: staff
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.staffLogout = async (req, res) => {
  try {
    res.clearCookie("staffToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateStaff = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.user.id,
      { email },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      data: updatedStaff
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const staff = await Staff.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    staff.password = hashedPassword;
    await staff.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find({ vendorId: req.user.id }).select("-password");

    res.status(200).json({
      success: true,
      count: staffList.length,
      data: staffList
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};