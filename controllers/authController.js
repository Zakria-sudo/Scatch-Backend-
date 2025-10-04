const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/tokenGeneration");

module.exports.createUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user){
      req.flash("error","You already have an account")
      return res.redirect("/")
      } 
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
        req.flash("success","User created succesfully");
        return res.redirect("/")
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
    if (!user) {
      req.flash("error", "Email or password incorrect");
      return res.redirect("/");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/shop")
      } else {
        req.flash("error","Email or password incorrect");
        res.redirect("/")
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.logoutUser = async (req,res)=>{
  try {
    res.cookie("token","")
    req.flash("success", "You have been logged out successfully");
    res.redirect("/")
  } catch (error) {
    res.send(error.message)
  }
}
