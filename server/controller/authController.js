const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const seceret = require("config").get("jwtSecret");

const maxAge = 3 * 24 * 60 * 60;
const handleErro = (err) => {
  if (err.errors.name) return "Name is required";
  else if (err.errors.password) return "Password is required";
  else if (err.errors.email) return "Email is required";
};
const tokenize = (id) => {
  return jwt.sign({ id }, seceret, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json(user);
  } catch (err) {
    let error = handleErro(err);
    res.status(400).json({ message: error });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = tokenize(user._id);
    res.status(200).json({ name: user.name, email: user.email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
