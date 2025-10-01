const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
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
  picture: String,
  products: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Owner", ownerSchema);
