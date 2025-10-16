const express=require('express')
const {userAuth}=require('../middleware/Auth')

const profileRouter=express.Router()

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports=profileRouter