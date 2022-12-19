const express = require("express");
const { sendMessage, allMessage } = require("../controllers/messageController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

//Message API Routes

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessage);

module.exports = router;
