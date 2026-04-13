const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");

exports.createPatient = async (req, res) => {
    try {
        const { name, email, phone, password, gender, age } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const patient = new Patient({
            name,
            email,
            phone,
            password: hashedPassword,
            gender,
            age
        });

        const savedPatient = await patient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: patient._id, role: "patient" },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("patientToken", token, {
            httpOnly: true,
            secure: false
        });

        res.json({
            message: "Login successful",
            token,
            patient: {
                id: patient._id,
                name: patient.name,
                email: patient.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getPatientProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({
      success: true,
      patient: req.user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPatients = async (req, res) => {

    try {
        const patients = await Patient.find();
        console.log(patients);
        res.json(patients);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getPatientById = async (req, res) => {

    try {

        const patient = await Patient.findById(req.params.id);

        res.json(patient);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


exports.updatePatient = async (req, res) => {

    try {

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPatient);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


exports.deletePatient = async (req, res) => {

    try {

        await Patient.findByIdAndDelete(req.params.id);

        res.json({ message: "Patient deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};



