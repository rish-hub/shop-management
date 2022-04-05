const express = require("express");
const router = express.Router();
const customerController = require("./../../controller/customerController");


router.post("/create", customerController.create);
router.get("/getCustomers", customerController.getCustomers);
router.get("/searchCustomers", customerController.searchCustomers);

module.exports = router;