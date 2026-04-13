const express = require("express");
const {
    adminSignup,
    adminLogin,
    getAdminProfile,
    getAllAppointments,
    getAdminDashboard,
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
} = require("../controllers/adminController");

const adminProtect = require("../middleware/adminAuthMiddleware");

const router = express.Router();

/* ================= AUTH ================= */
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.get("/admin/profile", adminProtect, getAdminProfile);
router.get("/admin/dashboard", adminProtect, getAdminDashboard);
router.get("/admin/appointments", getAllAppointments);

// /* ================= USERS ================= */
// router.get("/users", adminProtect, getAllUsers);
// router.get("/user/:id", adminProtect, getUserById);
// router.put("/user/:id", adminProtect, adminUpdateUser);
// router.delete("/user/:id", adminProtect, deleteUser);

module.exports = router;
