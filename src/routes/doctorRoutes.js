const express = require("express");
const router = express.Router();
const { getDoctorProfile, getMyDoctors, createDoctor, updateAvailability } = require("../controllers/doctorController");
const staffProtect = require("../middleware/staffAuthMiddleware");

// Doctor routes (staff only)
router.get("/doctors/allDoctors", staffProtect, getMyDoctors);              // Get all my doctors
router.get("/doctors/:id", staffProtect, getDoctorProfile);      // Get a single doctor profile
router.post("/doctors/create", staffProtect, createDoctor);            // Create doctor
router.put("/doctors/:id/availability", staffProtect, updateAvailability); // Update availability

module.exports = router;