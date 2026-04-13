const express = require('express');
const router = express.Router();
const {createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment} = require('../controllers/appointmentController');

router.post('/appointments/create', createAppointment);
router.get('/appointments/getAll', getAppointments);
router.get('/appointments/:id', getAppointmentById);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;