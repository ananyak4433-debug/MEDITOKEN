const express = require("express");
const {
    createVendor,
    vendorLogin,
    getVendorProfile,
    changeVendorPassword,
    getVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    updateVendorStatus
} = require("../controllers/vendorController");


const { vendorProtect } = require("../middleware/vendorAuthMiddleware");
const adminProtect = require("../middleware/adminAuthMiddleware");


const router = express.Router();

/* ================= AUTH ================= */
router.post("/vendor/signup",adminProtect, createVendor);
router.post("/vendor/login", vendorLogin);

/* ================= PROFILE ================= */
router.get("/vendor/profile", vendorProtect, getVendorProfile);
router.put("/vendor/change-password", vendorProtect, changeVendorPassword);

/* ================= VENDOR MANAGEMENT ================= */
router.get("/vendors", vendorProtect, getVendors);
router.get("/vendor/:id", adminProtect, getVendorById);
router.put("/vendor/:id", vendorProtect, updateVendor);
router.delete("/vendor/:id", vendorProtect, deleteVendor);
router.patch("/vendor/:id/status", adminProtect, updateVendorStatus);

module.exports = router;