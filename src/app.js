const express = require("express");
const { AdminAuth,userAuth } = require("./middleware/Auth");

const app = express();

app.use("/admin", AdminAuth);

app.get("/admin/getAllUser", (req, res) => {
  res.send("user list");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("user delete Sucessfully");
});

app.get('/user/profile',userAuth,(req,res)=>{
  res.send('user profile')
})

app.listen(7777, () => {
  console.log("Server running successfully on the server 7777");
});
