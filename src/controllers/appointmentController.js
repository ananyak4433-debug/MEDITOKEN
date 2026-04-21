const Appointment = require('../models/appointmentModel');

exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json('Appointment Saved Successfully');
    } catch (err) {
        res.status(500).json('Failed to create appointment');
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json('Failed to fetch appointments');
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json('Failed to fetch appointment');
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (req.body.status === 'cancelled') {
            updatedAppointment.canceledAt = new Date();
            await updatedAppointment.save();
        }
        res.status(200).json(updatedAppointment);
    } catch (err) {
        res.status(500).json('Failed to update appointment');
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json('Appointment deleted successfully');
    } catch (err) {
        res.status(500).json('Failed to delete appointment');
    }
};