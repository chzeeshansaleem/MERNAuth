const User = require("../models/userScheme");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name || password || email)) {
    res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const existemail = await User.findOne({ email: email });
    if (existemail) {
      res.status(409).send("Email already exists");
    } else {
      const user = new User({ name, email, password });
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Login Fnction
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(password || email)) {
    res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordcheck = await bcrypt.compare(password, user.password);

      //// create user tokens
      if (passwordcheck) {
        const token = await user.generateToken();
        console.log(token);
        res.status(200).send({ user, token });
      } else {
        res.status(400).send({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(404).send("Controller Error: " + error.message);
  }
};
exports.profile = async (req, res) => {
  try {
    const userValidation = await User.findOne({ _id: req.userid });
    res.status(200).send(userValidation);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
