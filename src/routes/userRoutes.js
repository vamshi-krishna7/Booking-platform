const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const validateRequest = require("../middlewares/validateRequest");
const { signupSchema } = require("../validations/signupSchema");

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
