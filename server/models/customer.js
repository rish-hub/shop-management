const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//Silver Schema
const CustomerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: [true, "Email cannot be empty!"],
            unique: [true, "Email already exists!"],
            lowercase: true,
        },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    { timestamps: true }
);



module.exports = CustomerModel = mongoose.model("customer", CustomerSchema, "customer");
