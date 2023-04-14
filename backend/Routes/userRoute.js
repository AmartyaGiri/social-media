const express = require("express");
const { registerUser, loginUser, logout, getUserProfile } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/user/me").get(getUserProfile);



module.exports = router;