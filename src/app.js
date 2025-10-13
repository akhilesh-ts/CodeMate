const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();
app.use(express.json());

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
      res.cookie('sdsssdssdsdsdsds')
      res.status(200).send("Login successfull");
    } else {
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const userList = await User.find();
    console.log(userList);
    res.send(userList);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
});

app.delete("/deleteuser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const response = await User.findByIdAndDelete({ _id: userId });
    console.log(response);
    res.send("user deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
});

app.patch("/update/:userId", async (req, res) => {
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "about",
      "skills",
      "age",
    ];
    const reqObject = Object.keys(req.body);
    const isAllowed = reqObject.every((updates) =>
      ALLOWED_UPDATES.includes(updates)
    );

    if (!isAllowed) {
      throw new Error(
        "some of the fields may not changed once its save.so you tryed to change that fields.. that is the issue"
      );
    }

    if (req.body.skills.length > 10) {
      throw new Error("skills must be less than 10");
    }
    const userId = req.params?.userId;
    const data = req.body;
    const userDetails = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });

    // res.send(userDetails);
    res.send("successfully updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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
