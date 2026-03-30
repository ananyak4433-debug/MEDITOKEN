console.log("STAFF ROUTES FILE IS LOADED");
const express = require("express");
const router = express.Router();
const { staffLogin } = require("../controllers/staffController");


router.post("/login", staffLogin);

module.exports = router;