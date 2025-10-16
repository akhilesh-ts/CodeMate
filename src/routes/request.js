const express=require('express')
const {userAuth}= require('../middleware/Auth')


const requestRoute=express.Router()



requestRoute.post("/sendConnectionRequest", userAuth, (req, res) => {
  res.send(`${req.user.firstName} is sending the connection request`);
});

module.exports=requestRoute