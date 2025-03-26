const express = require("express");
const { createBooking } = require("../controllers/bookingController");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticateUser, createBooking);

module.exports = router;
