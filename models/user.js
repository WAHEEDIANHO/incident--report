const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
