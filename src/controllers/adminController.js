const Admin = require("../models/adminModels");
const Vendor = require("../models/vendorModel");
// const Staff = require("../models/staffModels");
// const Patient = require("../models/patientModels");
// const Appointment = require("../models/appointmentModels");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= ADMIN SIGNUP ================= */
exports.adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= ADMIN LOGIN ================= */
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (admin.status !== "active") {
            return res.status(403).json({
                message: "Admin account is inactive or blocked"
            });
        }

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false
        });

        res.status(200).json({
            success: true,
            message: "Admin login successful"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= ADMIN PROFILE ================= */
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select("-password");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({
            success: true,
            admin
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= ADMIN DASHBOARD STATS ================= */
exports.getAdminDashboard = async (req, res) => {
    try {
        // Total counts
        const totalVendors = await Vendor.countDocuments();
        const totalStaff = await Staff.countDocuments();
        const totalPatients = await Patient.countDocuments();
        const totalAppointments = await Appointment.countDocuments();

        // Today's appointments
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayAppointments = await Appointment.countDocuments({
            bookedAt: {
                $gte: today,
                $lt: tomorrow
            }
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalVendors,
                totalStaff,
                totalPatients,
                totalAppointments,
                todayAppointments
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


/* ================= CREATE VENDORS ================= */
exports.createVendor = async (req, res) => {
    try {
        const { vendorName, email, password, organisationName, address, registrationNumber, phone } = req.body;

        if (!vendorName || !email || !password || !organisationName || !address || !phone) {
            return res.status(400).json({
                success: false,
                message: "All Required Fields must be Provided"
            })
        }

        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(404).json({
                sucess: false,
                message: "Vendor Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const vendor = await Vendor.create({
            vendorName, email,
            password: hashedPassword,
            organisationName, address, registrationNumber, phone,
            createdBy: req.adminId
        });

        res.status(400).json({
            success: true,
            message: "Vendor Created Successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    };
};



/* ================= GET ALL USERS ================= */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            totalUsers: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/* ================= GET ALL VENDORS ================= */
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().select("-password");

        res.status(200).json({
            success: true,
            totalVendors: vendors.length,
            vendors
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= GET ALL STAFF ================= */
exports.getAllStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find().select("-password");

        res.status(200).json({
            success: true,
            totalStaffs: staffs.length,
            staffs
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= GET USER BY ID ================= */
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= GET VENDOR BY ID ================= */
exports.getVendorById = async (req, res) => {
    try {
        const { id } = req.params;

        const vendor = await Vendor.findById(id).select("-password");

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({
            success: true,
            vendor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/* ================= GET STAFF BY ID ================= */
exports.getStaffById = async (req, res) => {
    try {
        const { id } = req.params;

        const staff = await Staff.findById(id).select("-password");

        if (!staff) {
            return res.status(404).json({ message: "staff not found" });
        }

        res.status(200).json({
            success: true,
            vendor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= DELETE VENDOR ================= */
exports.deleteVendor = async (req, res) => {
    try {
        const vendorId = req.params.id;

        const vendor = await Vendor.findByIdAndDelete(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({
            success: true,
            message: "Vendor deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= DELETE STAFF ================= */
exports.deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.id;

        const staff = await Staff.findByIdAndDelete(staffId);
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


/* ================= ADMIN UPDATE USER ================= */
exports.adminUpdateUser = async (req, res) => {
    try {
        const { id } = req.params; // userId
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated by admin",
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= ADMIN UPDATE VENDOR ================= */
exports.adminUpdateVendor = async (req, res) => {
    try {
        const { id } = req.params; // vendorId
        const { vendorName, email, organisationName } = req.body;

        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { vendorName, email, organisationName },
            { new: true, runValidators: true }
        ).select("-password");

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({
            success: true,
            message: "Vendor updated by admin",
            vendor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= ADMIN UPDATE STAFF ================= */
exports.adminUpdateStaff = async (req, res) => {
    try {
        const { id } = req.params; // vendorId
        const { staffName, email } = req.body;

        const staff = await Staff.findByIdAndUpdate(
            id,
            { staffName, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!staff) {
            return res.status(404).json({ message: "Satff not found" });
        }

        res.status(200).json({
            success: true,
            message: "Staff updated by admin",
            vendor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* ================= UPDATE VENDOR STATUS ================= */
exports.updateVendorStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status value
        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select("-password");

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Vendor ${status} successfully`,
            vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


/* ================= GET ALL APPOINTMENTS (ADMIN - PAGINATED) ================= */
exports.getAllAppointments = async (req, res) => {
    try {
        const { page = 1, limit = 10, vendorId, status, date } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        let filter = {};

        // Filter by vendor
        if (vendorId) {
            filter.vendorId = vendorId;
        }

        // Filter by status
        if (status) {
            filter.status = status;
        }

        // Filter by specific date
        if (date) {
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);

            const nextDay = new Date(selectedDate);
            nextDay.setDate(nextDay.getDate() + 1);

            filter.bookedAt = {
                $gte: selectedDate,
                $lt: nextDay
            };
        }

        // Total count for pagination metadata
        const totalAppointments = await Appointment.countDocuments(filter);

        // Fetch paginated results
        const appointments = await Appointment.find(filter)
            .populate("vendorId", "vendorName organisationName")
            .populate("patientId", "name phone")
            .populate("staffId", "email")
            .sort({ bookedAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalAppointments / limitNumber),
                totalAppointments,
                pageSize: limitNumber
            },
            appointments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};