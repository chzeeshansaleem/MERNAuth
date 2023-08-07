const express = require("express");
const route = express.Router();
const controller = require("../controller/userControllers");
const auth = require("../Authentication/auth");
route.post("/register", controller.register);
route.post("/login", controller.login);
route.get("/profile", auth, controller.profile);
module.exports = route;
