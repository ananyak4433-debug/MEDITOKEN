const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  customId: {
    type: Number,
    unique: true,      // ensures no two staff have the same ID
    required: true     // must provide a number when creating staff
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor"
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Staff", staffSchema);