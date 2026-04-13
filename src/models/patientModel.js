const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: "Other"
        },

        age: {
            type: Number,
            required:true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
