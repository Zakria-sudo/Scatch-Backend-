const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength:3,
    trim:true
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
  cart: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
  }],
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
