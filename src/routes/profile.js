const express = require("express");
const { userAuth } = require("../middleware/Auth");
const { validateEditField } = require("../utils/validation");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();
profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditField(req.body);
    const LoggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key]));

    
    await LoggedInUser.save();

    res.json({
      message: `${LoggedInUser.firstName} your data is successfully updates`,
      LoggedInUser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const LoggedInUser = req.user;
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(`${newPassword} is not valid`);
    }

    const isPasswordSame = await LoggedInUser.ValidatePassword(newPassword);
    if (isPasswordSame) {
      throw new Error(
        "New password cannot be the same as your previous password. Please choose another password."
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    LoggedInUser.password = hashPassword;

    await LoggedInUser.save();

    res.status(200).json({ message: "password successfully updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = profileRouter;
