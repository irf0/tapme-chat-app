//This middleware is created for using in the allUser serach functionality.
//This middleware will help to prevent the logged in from searching his himself

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Usually jwt tokens starts as, Bearer iwjfc858xw...
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //Split the "Bearer"

      //Decoding the token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authorized");
    }
    if (!token) {
      throw new Error("Acess Denied, User not authorized ");
    }
  }
});

module.exports = { protect };
