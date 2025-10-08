const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Userschema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      minLength: [3, "minimum length atleast 3"],
      maxLength: [10, "maximum length should be 7"],
      validate: {
        validator: (v) => /^[A-Za-z0-9]+$/.test(v),
        message: (props) => `${props.value} is not a valid username`,
      },
    },
    lastName: {
      type: String,
      minLength: [2, "minimum length should be 2"],
      maxLength: [5, "maximum length should be 5"],
      required: [true, "lastname is required"],
      validate: {
        validator: (v) => /^[A-Za-z0-9]+$/.test(v),
        message: (props) => `${props.value} is not a valid lastname`,
      },
    },
    email: {
      type: String,
      unique: [true, "email already exists try another one"],
      required: [true, "email is required "],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) =>
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v),
        message: (props) => `${props.value} is not a valid email format..`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "minimum length shoud be 8"],
      maxLength: [15, "maximum length should be 15"],
      validate: {
        validator: (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/.test(v),
        message: (props) => `${props.value} is not a valid format`,
      },
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      min: [18, "age should be greater than 18"],
      validate: {
        validator: (v) => /^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/.test(v),
        message: (props) => `${props.value} is not valid`,
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6g9BWr61gs6KYIq3zjFEy36Z8OuOIJQ75A&s",
      validate: {
        validator: (v) => /^https?:\/\/.+\..+/.test(v),
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    about: {
      type: String,
      default: "this is the default about section",
      maxLength: [250, "about section can be maximum 250 characters"],
    },
    skills: {
      required: true,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", Userschema);
