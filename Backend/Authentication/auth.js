const jwt = require("jsonwebtoken");
const User = require("../models/userScheme");
require("dotenv").config();
const secret_Key = process.env.Key;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, secret_Key);
    const user = await User.findOne({ _id: verifytoken._id });
    if (!user) {
      return res.status(401).json({ message: "User Not Exist" });
    }
    req.token = token;
    req.user = user;
    req.userid = user._id;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Invalid Token", Text: "Authentication Error" });
  }
};
module.exports = auth;
