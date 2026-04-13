const express = require("express");


const router = express.Router();

const {
    createPatient,
    loginPatient,
    getPatientProfile,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");
const patientProtect = require("../middleware/patientAuthMiddileware");

router.post("/patients/signup", createPatient);
router.post("/patients/login",loginPatient);
router.get("/patients/profile",patientProtect,getPatientProfile);
router.get("/patients", getPatients);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);


module.exports = router;





