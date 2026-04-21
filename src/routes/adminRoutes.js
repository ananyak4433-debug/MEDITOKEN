const express = require("express");
const {
    adminSignup,
    adminLogin,
    getAdminProfile,
    createVendor,
    getAllUsers,
    getAllVendors,
    getAllStaffs,
    deleteUser,
    deleteVendor,
    deleteStaff,
    adminUpdateUser,
    adminUpdateVendor,
    adminUpdateStaff,
    updateVendorStatus,
    getUserById,
    getVendorById,
    getStaffById,
    getAllAppointments,
    getAdminDashboard
} = require("../controllers/adminController");

const adminProtect = require("../middleware/adminAuthMiddleware");

const router = express.Router();

/* ================= AUTH ================= */
router.post("/admin/signup",adminProtect, adminSignup);
router.post("/admin/login",adminProtect, adminLogin);
router.get("/admin/profile", adminProtect, getAdminProfile);
router.get("/admin/dashboard", adminProtect, getAdminDashboard);
router.get("/admin/appointments", adminProtect, getAllAppointments);

/* ================= USERS ================= */
router.get("/users", adminProtect, getAllUsers);
router.get("/user/:id", adminProtect, getUserById);
router.put("/user/:id", adminProtect, adminUpdateUser);
router.delete("/user/:id", adminProtect, deleteUser);

/* ================= VENDORS ================= */
router.post("/vendor", adminProtect, createVendor);
router.get("/vendors", adminProtect, getAllVendors);
router.get("/vendor/:id", adminProtect, getVendorById);
router.put("/vendor/:id", adminProtect, adminUpdateVendor);
router.delete("/vendor/:id", adminProtect, deleteVendor);
router.patch("/vendor/:id/status", adminProtect, updateVendorStatus);

/* ================= STAFFS ================= */
router.get("/staffs", adminProtect, getAllStaffs);
router.get("/staff/:id", adminProtect, getStaffById);
router.put("/staff/:id", adminProtect, adminUpdateStaff);
router.delete("/staff/:id", adminProtect, deleteStaff);

module.exports = router;
