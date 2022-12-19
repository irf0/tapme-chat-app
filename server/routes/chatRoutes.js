const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");

//Accessing the chats

//protect --> Only loggedIn users can access the chats.
//1.("/").post(protect, accessChats) --> Post or start chatting with someone
//2.("/").get(protect, fetchChats) --> See all the chats.
//3.("/creategroup").post --> Create a new group.
//4.("/renameGroup").put --> Rename a group.
//5.("/addGroup").put --> Add someone to the group.
//6.("/removeGroup").delete --> Remove someone from group or leave group.

router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
router.route("/creategroup").post(protect, createGroupChat);
router.route("/renamegroup").put(protect, renameGroup);
router.route("/addgroup").put(protect, addToGroup);
router.route("/removegroup").delete(protect, removeFromGroup);

module.exports = router;
