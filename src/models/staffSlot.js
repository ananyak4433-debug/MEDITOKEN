const mongoose = require("mongoose");
const { create } = require("./staff");
const staffSlotSchema = new mongoose.Schema({
    staffID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Staff",
        required:true
    },

    slotDate: {
        type: Date,
        require:true
    },

    startTime:{
        type: String,
        required: true
    },

    endTime:{
        type: String,
        required: true
    },

    isBooked:{
        type: Boolean,
        default: false
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("staffSlot",staffSlotSchema);