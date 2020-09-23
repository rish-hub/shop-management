const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//Silver Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email cannot be empty!"],
      unique: [true, "Email already exists!"],
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const newSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, newSalt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Email or Password");
  }
  throw Error("Incorrect Email or Password");
};

module.exports = UserModel = mongoose.model("user", UserSchema, "user");
