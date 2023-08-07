const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./Config/db");
const router = require("./router/route");
const port = process.env.PORT || 8080;
app.use(express.json());

app.use(cors());

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
