const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Authentication")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log("DB Error: " + e.message);
  });
