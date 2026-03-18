const express = require("express");


const router = express.Router();

const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");

router.post("/patients", createPatient);

router.get("/patients", getPatients);

router.get("/patients/:id", getPatientById);

router.put("/patients/:id", updatePatient);

router.delete("/patients/:id", deletePatient);


module.exports = router;





