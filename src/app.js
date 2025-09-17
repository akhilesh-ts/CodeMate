const express = require("express");

const app = express();



app.use("/hello", (req, res) => {
  res.send("hello world");
});

app.use("/test", (req, res) => {
  res.send("test server");
});

app.listen(7777, () => {
  console.log("Server running successfully on the server 7777");
});
