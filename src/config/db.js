const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/MEDITOKEN");
        console.log("Database Connected Successfully");
    } catch (err) {
        console.log("Database Connection Failed:", err.message);
    }
};

module.exports = connectDB;