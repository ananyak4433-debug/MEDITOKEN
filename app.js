require("dotenv").config();
const express = require("express");
const app = express();

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const connectDB = require("./src/config/db");
connectDB();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


const adminRoutes = require("./src/routes/adminRoutes");
const doctorRoutes = require("./src/routes/doctorRoutes.js");
const patientRoutes = require("./src/routes/patientRoutes");
const staffRoutes = require("./src/routes/staffRoutes.js");
const vendorRoutes = require('./src/routes/vendorRoutes.js')
const appointmentRoutes= require('./src/routes/appointmentRoutes.js')

app.use("/api", staffRoutes);
app.use("/api", adminRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', vendorRoutes);
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);

app.listen(7000, () => {
  console.log("Server running on port 7000");
});











// require("dotenv").config();
// const express = require("express");
// const app = express();

// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// // DB
// const connectDB = require("./src/config/db");
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // 🔍 Debug middleware (optional but useful)
// app.use((req, res, next) => {
//   console.log("➡️", req.method, req.url);
//   next();
// });

// app.post("/api/staff/signup", (req, res) => {
//   res.send("DIRECT ROUTE WORKING");
// });

// // Routes
// const adminRoutes = require("./src/routes/adminRoutes");
// const doctorRoutes = require("./src/routes/doctorRoutes");
// console.log("Loading staff routes...");
// const staffRoutes = require("./src/routes/staffRoutes");
// const patientRoutes = require("./src/routes/patientRoutes");
// const vendorRoutes = require("./src/routes/vendorRoutes");
// const appointmentRoutes = require("./src/routes/appointmentRoutes");

// // ✅ Clean route structure (IMPORTANT)
// app.use("/api/admin", adminRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/vendors", vendorRoutes);
// app.use("/api/appointments", appointmentRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

