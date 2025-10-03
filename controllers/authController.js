const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/tokenGeneration");

module.exports.createUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(409).send("You already have an account");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("User created successfully");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).send("email or password incorrect");
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("You can login");
      } else {
        return res.status(404).send("email or password incorrect");
      }
    });
  } catch (error) {
    res.send(err.message);
  }
};
