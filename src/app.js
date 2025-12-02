require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRoute = require("./routes/request.js");
const userRouter = require("./routes/user.js");
require('./utils/scheduleEmail.js')

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRoute);
app.use("/", userRouter);
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
