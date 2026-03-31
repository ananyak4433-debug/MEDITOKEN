const { error } = require("console");
const staffSlot = require("../Models/staffSlot");

//craete slot
exports.createSlot = async (req, res) => {
    try{
        const slot = await StaffSlot.create(req.body);
        res.status(201).json(slot);
    }catch (error) {
        res.status(400).json({message: error.message});
    }
};

//get all slots
exports.getslots = async (req, res) => {
    try{
        const slot = await StaffSlot.find().populate("staffid");
        res.json(slots);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// update booking status
exports.bookSlot =async (req,res) => {
    try{
        const slot =await StaffSlot.findByIdAndUpdate(
            req.params.id,
            { isBooked: true},
            {new: true}
        );

        res.json(slot);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};