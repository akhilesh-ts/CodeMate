const express = require("express");

const app = express();


app.get('/user',(req,res)=>{
  res.send({First_Name:"akhilesh",Last_Name:"Ts",City:"Dubai",Job:"Software Engineer"})
})

app.post("/user",(req,res)=>{
  res.send("Data successfully saved")
})

app.delete('/user',(req,res)=>{
  res.send("Deleted Sucessfully deleted")
})


app.listen(7777, () => {
  console.log("Server running successfully on the server 7777");
});
