    const Doctor = require("../models/doctorCollection");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    /* ================= DOCTOR PROFILE ================= */

    // exports.getDoctorProfile = async (req, res) => {
    //   try {
    //     const doctor = await Doctor.findById(req.doctorId).select("-password");

    //     if (!doctor) {
    //       return res.status(404).json({ message: "Doctor not found" });
    //     }

    //     res.status(200).json({
    //       success: true,
    //       doctor
    //     });

    //   } catch (error) {
    //     res.status(500).json({ error: error.message });
    //   }
    // };


    exports.getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({
        _id: req.params.id,
        staffId: req.user._id
        });

        if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({
        success: true,
        doctor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    /* ================= DOCTOR ALLGET ================= */

    exports.getMyDoctors = async (req, res) => {
    const doctors = await Doctor.find({ staffId: req.user._id });
    res.json(doctors);
    };

        /* ================= DOCTOR CREATE ================= */
    
        exports.createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create({
        ...req.body,
        staffId: req.user._id,   // VERY IMPORTANT
        });

        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    /* ================= DOCTOR AVAILABILITY ================= */

    exports.updateAvailability = async (req, res) => {
    const doctor = await Doctor.findOne({
        _id: req.params.id,
        staffId: req.user._id,  // prevents editing others
    });

    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.availability = req.body.availability;
    await doctor.save();

    res.json(doctor);
    };