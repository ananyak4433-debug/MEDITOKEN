const Vendor = require('../models/vendorModel');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

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
            return res.status(409).json({
                success: false,
                message: "Vendor Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const vendor = await Vendor.create({
            vendorName, email,
            password: hashedPassword,
            organisationName, address, registrationNumber, phone,
            createdBy: req.user
        });

        res.status(201).json({
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



exports.vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        // Check vendor
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { id: vendor._id, role: "vendor" },
            process.env.SECRET_KEY,   // move to .env in real project
            { expiresIn: "1d" }
        );

        res.cookie("vendorToken", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.status(200).json({
            message: "Login successful",
            token,
            vendor: {
                id: vendor._id,
                name: vendor.vendorName,
                email: vendor.email,
                status: vendor.status
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getVendorProfile = async (req, res) => {
    try {
        if (req.user.role !== "vendor") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const vendor = await Vendor.findById(req.user.id).select("-password");

        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: vendor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log("Cookies:", req.cookies);
    console.log("User:", req.user);
};



exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().select("-password");

        res.status(200).json({
            success: true,
            data: vendors
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json('Failed to fetch vendor');
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedVendor);
    } catch (err) {
        res.status(500).json('Failed to update vendor');
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.status(200).json('Vendor deleted successfully');
    } catch (err) {
        res.status(500).json('Failed to delete vendor');
    }
};


exports.toggleVendorStatus = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);

        vendor.status = vendor.status === "active" ? "inactive" : "active";

        await vendor.save();

        res.status(200).json({
            success: true,
            status: vendor.status
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeVendorPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const vendor = await Vendor.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        vendor.password = hashedPassword;

        await vendor.save();

        res.status(200).json({
            success: true,
            message: "Password updated"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.vendorLogout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
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