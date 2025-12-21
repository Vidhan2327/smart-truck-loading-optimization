const express = require("express");
const router = express.Router();

const { Register, Login, Logout } = require("../Controller/AuthController");
const { protect } = require("../Middleware/Authmd");

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);


router.get("/check", protect, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

module.exports = router;
