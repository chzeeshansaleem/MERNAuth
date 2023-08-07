const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
require("dotenv").config();
const secret_Key = process.env.Key;
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
//Password hashing function
Schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
// token generate
Schema.methods.generateToken = async function () {
  try {
    let usertoken = jwt.sign({ _id: this.id }, secret_Key);
    this.tokens = this.tokens.concat({ token: usertoken });
    await this.save();
    return usertoken;
  } catch (error) {
    response.status(422).send(error);
  }
};
const usermodel = mongoose.model("user", Schema);
module.exports = usermodel;
