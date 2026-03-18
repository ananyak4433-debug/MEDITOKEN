const Patient = require("../models/patientModel");

exports.createPatient = async (req, res) => {

    const { name, email, phone, password, gender } = req.body;

    try {
        console.log("controller");
        const patients = new Patient({
            name,
            email,
            phone,
            password,
            gender
        });

        const savedPatient = await patients.save();

        res.status(201).json(savedPatient);

    } catch (error) {

        res.status(500).json({ message: error.message });

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



