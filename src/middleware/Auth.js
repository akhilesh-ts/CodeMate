const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({message:"please login to continue..."})
    }
    const { _id } = jwt.verify(token, "CodeMate@2025");
    const currentUser = await User.findById(_id);

    if (!currentUser) {
      throw new Error("User not found");
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  userAuth,
};
