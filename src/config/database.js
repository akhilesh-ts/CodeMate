const mongoose = require("mongoose");

const connectDB= async () => {
  await mongoose.connect("mongodb+srv://akhilbhaskarants_db_user:GCUqyMRjx7ijqn8s@cluster.nyxjrlp.mongodb.net/CodeMate") 
};


module.exports=connectDB