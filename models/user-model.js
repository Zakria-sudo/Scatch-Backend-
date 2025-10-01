const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ScatchDB");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture:String,
  contactno: Number,
  isadmin: Boolean,
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
