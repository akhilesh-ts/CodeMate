const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRoute = require("./routes/request.js");


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRoute)

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
