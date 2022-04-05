const Customer = require("./../models/Customer");
const { json } = require("express");

module.exports.getCustomers = async (req, res) => {
    try {
        const customer = await Customer.find({});
        if (customer) {
            res.status(201).json(customer);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports.searchCustomers = async (req, res) => {
    try {
        const { phone, name } = req.query;
        const customer = await Customer.find({ $or: [{ phone: new RegExp(phone, "i") }, { name: new RegExp(name, "i") }] });
        if (customer) {
            res.status(201).json(customer);
        }


    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports.create = async (req, res) => {
    const { email, name, phone, address } = req.body;
    try {
        const customer = await Customer.create({ ...req.body });
        res.status(201).json({ customer });
    } catch (err) {
        // let error = handleErro(err);
        res.status(400).json({ message: err });
    }
};

