const corn = require("node-cron");
const { startOfDay, endOfDay, subDays, } = require("date-fns");
const connectionRequest = require("../models/connectionRequest");
const {run} =require('../utils/sendEmail')

const yesterday = subDays(new Date(), 1);



const startOfYesterday = startOfDay(yesterday);
const endOfYesterday = endOfDay(new Date());


corn.schedule("0 8 * * *", async () => {
  const pendingRequests = await connectionRequest.find({
    status:'Interested',
    createdAt:{
        $gte:startOfYesterday,
        $lt:endOfYesterday
    }
  }).populate("fromUserId toUserId")

  const list_email=[...new Set(pendingRequests.map((req)=>req.toUserId.email))]

    list_email.map((email)=>(
       run()
    ))
});
