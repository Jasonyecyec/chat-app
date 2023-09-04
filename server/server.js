const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

app.use(cors());

app.listen(3001, () => {
  console.log("server is running");
});
