const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, email, password } = req.body.formData;

    if (validator.isEmail(email)) {
      throw new Error("email is not valid");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(201).send("user saved successfully on the databse");
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("invalid email or password");
    }
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      throw new Error("invalid email or password");
    }
    const isValidPassword = await userDetails.ValidatePassword(password);

    if (isValidPassword) {
      const token = await userDetails.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json(userDetails);
    } else {
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("successfully logout");
});

module.exports = authRouter;
