const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    breakStart: {
        type: String

    },
    breakEnd: {
        type: String

    },
});

const doctorSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    availability: [availabilitySchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Doctor", doctorSchema);