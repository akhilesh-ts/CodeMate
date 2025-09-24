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
    console.log(err);
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
