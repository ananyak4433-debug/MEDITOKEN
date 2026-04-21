const express = require("express");
const router = express.Router();
const { getDoctorProfile, getMyDoctors, createDoctor, updateAvailability } = require("../controllers/doctorController");
const Protect = require("../middleware/authMiddleware");

// Doctor routes (staff only)
router.get("/", Protect, getMyDoctors);              // Get all my doctors
router.get("/:id", Protect, getDoctorProfile);      // Get a single doctor profile
router.post("/", Protect, createDoctor);            // Create doctor
router.put("/:id/availability", Protect, updateAvailability); // Update availability

module.exports = router;