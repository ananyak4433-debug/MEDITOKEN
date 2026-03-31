const expressn = require("express");
// const { bookSlot } = require("../controllers/staffSlotControllers");
const router = expressn.Router();
const{
    createSlot,
    getslots,bookSlot
} = require("../controllers/staffSlotControllers");

router.post("/",createSlot);
router.get("/",getslots);
router.purge("/book/:id",bookSlot);


module.exports = router;