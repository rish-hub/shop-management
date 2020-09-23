const express = require("express");
const mongoose = require("mongoose");

const app = express();
const morgan = require("morgan");

app.use(express.json());
// Db config

app.use(morgan("dev"));

app.use("/", (req, res) => {
  res.json({ res: "intial response" });
});

module.exports = app;
