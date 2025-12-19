const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../Controller/AuthController");
const authmiddleware = require("../Middleware/Authmd");

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", authmiddleware, Logout);
module.exports = router;
