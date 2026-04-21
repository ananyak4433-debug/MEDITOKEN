const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
{
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staff",
        required:true
    },
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Slot",
        required:true
    },
    tokenNumber:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['available','booked','cancelled','completed'],
        required:true
    },
    canceledAt:{
        type:Date
    },
    bookedAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = Appointment;