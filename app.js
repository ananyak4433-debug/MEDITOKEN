require("dotenv").config();
const express = require("express");
const app = express();

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt=require('jsonwebtoken');

const connectDB = require("./src/config/db");
connectDB();

app.use(express.json());
app.use(cookieParser());



const adminRoutes = require("./src/routes/adminRoutes");
app.use("/admin", adminRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
