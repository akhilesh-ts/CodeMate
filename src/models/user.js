const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      default: null,
      minLength: [2, "minimum length should be 2"],
      maxLength: [5, "maximum length should be 5"],
      // required: [true, "lastname is required"],
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            `${value} is not a correct email address..try another one`
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "minimum length shoud be 8"],
      // maxLength: [150, "maximum length should be 15"],
      validate: {
        validator: (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/.test(v),
        message: (props) => `${props.value} is not a valid format`,
      },
    },
    title: {
      type: String,
      required: [true, "title is required"],
      max: [20, "maximum should be 20"],
    },
    age: {
      type: Number,
      // required: [true, "age is required"],

      min: [18, "age should be greater than 18"],
      validate: {
        validator: (v) => /^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/.test(v),
        message: (props) => `${props.value} is not valid`,
      },
    },
    gender: {
      type: String,
      lowercase: true,
      default: null,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6g9BWr61gs6KYIq3zjFEy36Z8OuOIJQ75A&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`${value} this is not a valid url format`);
        }
      },
    },
    about: {
      type: String,
      default: "this is the default about section",
      maxLength: [250, "about section can be maximum 250 characters"],
    },
    skills: {
      // required: true,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
Userschema.methods.ValidatePassword = async function (passwordInputByUser) {
  const user = this;
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );

  return isValidPassword;
};

Userschema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "CodeMate@2025", {
    expiresIn: "7d",
  });
  return token;
};

module.exports = model("User", Userschema);
