require("dotenv").config();
const express = require("express");
const app = express();

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const connectDB = require("./src/config/db");
connectDB();

app.use(express.json());
app.use(cookieParser());



const adminRoutes = require("./src/routes/adminRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes.js");
const staffRoutes = require("./src/routes/staffRoutes.js");
app.use("/api", adminRoutes);

app.use("/api/staff-slots",require("./src/routes/staffSlotRoutes"));
app.use('/api/appointments', require('./src/routes/appointmentRoutes'));
app.use('/api/vendors', require('./src/routes/vendorRoutes'));
const patientRoutes = require("./src/routes/patientRoutes");
app.use("/api/doctors", doctorRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", patientRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
