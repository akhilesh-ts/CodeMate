const express = require("express");
const { userAuth } = require("../middleware/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRoute = express.Router();

requestRoute.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user._id.toString();
      const { status, userId } = req.params;
      const isAllowedStatus = ["Interested", "Ignore"];

      if (!isAllowedStatus.includes(status)) {
        throw new Error("Status  should be Interested or Ignore");
      }
      const isToUserExist = await User.findById(userId);
      
      if (!isToUserExist) {
        throw new Error("User not found");
      }

      const isconnectionExisit = await connectionRequest.findOne({
        $or: [
          { fromUserId: user, toUserId: userId },
          { fromUserId: userId, toUserId: user },
        ],
      });

      if (isconnectionExisit) {
        throw new Error("Connection request is already made");
      }

      const NewConnectoinRequest = new connectionRequest({
        fromUserId: user,
        toUserId: userId,
        status: status,
      });

      await NewConnectoinRequest.save();

      res.json({
        message: "successfully send connection request",
        NewConnectoinRequest,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

requestRoute.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;

      const isAllowedStatus = ["Accepted", "Rejected"];

      if (!isAllowedStatus.includes(status)) {
        return res.status(400).json({ message: `${status} is not allowed` });
      }

      const request = await connectionRequest.findOne({
        _id: requestId,
        status: "Interested",
        toUserId: loggedInUser._id,
      });

      if (!request) {
        throw new Error("request not found");
      }

      request.status = status;

      const data = await request.save();

      res.status(200).json({ message: "request updated successfully", data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = requestRoute;
