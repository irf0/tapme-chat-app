//All of the routes which are related to the user
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", loginUser);
router.route("/register").post(registerUser); //This end-point is like /api/user/(register)
router.route("/").get(protect, allUsers);
module.exports = router;
