const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);

    const abc = await user.save();

    res.send("user saved successfully on the databse");
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err);
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

app.patch("/update", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    const userDetails = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });

    res.send(userDetails);
  } catch (error) {
    res.status(400).send(error, "Something went wrong");
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
