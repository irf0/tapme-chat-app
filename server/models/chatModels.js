const mongoose = require("mongoose");

//Creating the first mongoose model

//What fields do we need?
// 1.chatName
// 2.isGroupChat
// 3.users
// 4.latestMessage ->Showing w/o opening the chatName
// 5.groupAdmin
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
//Create the model
const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
