const { model, Schema } = require("mongoose");
const user = require("../models/user");

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["Interested", "Accepted", "Ignore", "Rejected"],
        message: "{VALUE} is not valid status",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const currentUser = this;

  if (currentUser.fromUserId.equals(currentUser.toUserId)) {
    throw new Error("you cannot send request itself");
  }
  next();
});

module.exports = model("ConnectionRequest", connectionRequestSchema);
