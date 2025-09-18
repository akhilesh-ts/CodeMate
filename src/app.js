const express = require("express");

const app = express();

app.get("/user/:id/:name/:city/:job", (req, res) => {
  console.log(req.params);
  res.send({
    First_Name: "akhilesh",
    Last_Name: "Ts",
    City: "Dubai",
    Job: "Software Engineer",
  });
});

app.get(
  "/user",
  (req, res, next) => {
    // res.send("no user found 1");
    next()
  },
  (req, res,next) => {
    // res.send("no user found 2");
    next();
  }
  ,
  (req, res,next) => {
    // res.send("no user found 2");
    next();
  }
  
);

app.post("/user", (req, res) => {
  res.send("Data successfully saved");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Sucessfully deleted");
});

app.listen(7777, () => {
  console.log("Server running successfully on the server 7777");
});
