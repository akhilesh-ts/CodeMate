const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/Auth.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;
    if (req.body.skills.length > 10) {
      throw new Error("skills must be less than 10");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    const abc = await user.save();

    res.send("user saved successfully on the databse");
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("invalid email or password");
    }
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      throw new Error("invalid email or password");
    }
    const isValidPassword = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (isValidPassword) {
      const token = await jwt.sign({ _id: userDetails._id }, "CodeMate@2025", {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("Login successfull");
    } else {
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/sendConnectionRequest',userAuth,(req,res)=>{
  res.send(`${req.user.firstName} is sending the connection request`)
})

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
      console.log("server running successfully on the server 7777");
    });
  })
  .catch(() => {
    console.log("Databse have some issues to connect");
  });
