const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const seceret = require("config").get("jwtSecret");

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({}).select("name email");
    if (user) {
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
