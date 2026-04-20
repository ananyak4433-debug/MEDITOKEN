// console.log("STAFF ROUTES FILE IS LOADED");
// const express = require("express");
// const router = express.Router();

// const { staffLogin,staffSignup, staffLogout, getStaffProfile, updateStaff, changePassword, getAllStaff,deleteStaff } = require("../controllers/staffController");


// const staffProtect =require('../middleware/staffAuthMiddleware');
// const { vendorProtect } = require("../middleware/vendorAuthMiddleware");

// router.post("/staff/signup",vendorProtect, staffSignup);
// router.post("/staff/login", staffLogin);
// router.post("/staff/logout", staffProtect, staffLogout);

// router.get("/staff/profile", staffProtect, getStaffProfile);
// router.put("/staff/update", staffProtect, updateStaff);
// router.put("/staff/change-password", staffProtect, changePassword);

// router.get("/staff/all",vendorProtect, getAllStaff);
// router.delete("/staff/:id",staffProtect, deleteStaff);

// module.exports = router;





console.log("STAFF ROUTES FILE IS LOADED");
const express = require("express");
const router = express.Router();

const { staffLogin,
    staffSignup, 
    staffLogout, 
    getStaffProfile, 
    updateStaff, 
    changePassword, 
    getAllStaff,
    deleteStaff } = require("../controllers/staffController");


const staffProtect =require('../middleware/staffAuthMiddleware');
const { vendorProtect } = require("../middleware/vendorAuthMiddleware");

// router.post("/staff/signup",vendorProtect, staffSignup);
router.post("/staff/signup", (req, res, next) => {
  console.log("🔥 ROUTE HIT BEFORE MIDDLEWARE");
  next();
}, vendorProtect, staffSignup);
router.post("/staff/login", staffLogin);
router.post("/staff/logout", staffProtect, staffLogout);

router.get("/staff/profile", staffProtect, getStaffProfile);
router.put("/staff/update", staffProtect, updateStaff);
router.put("/staff/change-password", staffProtect, changePassword);

router.get("/staff/all",vendorProtect, getAllStaff);
router.delete("/staff/:id",staffProtect, deleteStaff);

module.exports = router;