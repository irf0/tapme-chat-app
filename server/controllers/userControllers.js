//All the logic related to the user end-point will be defined here.
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists!");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

//Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await User.findOne({ email: email });

  if (userLogin && (await userLogin.matchPassword(password))) {
    res.json({
      _id: userLogin._id,
      name: userLogin.name,
      email: userLogin.email,
      pic: userLogin.pic,
      token: generateToken(userLogin._id),
    });
  } else {
    res.status(401);
    throw new Error("Access Denied!");
  }
});

// /api/users/search?=Irfan
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //regex helps us match the string with the specified query,
          //'i'--> to match both uppercase & lowercase
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
  //$ne --> Except the user already loggedin
});

module.exports = { registerUser, loginUser, allUsers };
