const express = require("express");
const router = express.Router();
const userController = require("./../../controller/userController");
const auth = require("./../../middleware/auth");
// @route Get api/User
// @Dec   Get all details of the loggedin User
// @access Private
router.post("/getalluser", auth, userController.getAllUser);

module.exports = router;
