const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();


router.get("/", (req, res) => {
  let error = req.flash("error")
  let success = req.flash("success")
  res.render("index",{error,success});
});

router.get("/shop",isLoggedin,async (req, res) => {
  let success = req.flash("success")
  let products = await productModel.find()
  res.render("shop",{products,success});
});

router.get("/add-to-cart/:productID",isLoggedin, async (req,res)=>{
  let user = await userModel.findOne({email: req.user.email})
  user.cart.push(req.params.productID)
  await user.save()
  req.flash("success", "Added to cart")
  return res.redirect("/shop")
})

router.get("/cart",isLoggedin, async (req,res)=>{
  let user = await userModel.findOne({email:req.user.email}).populate("cart")
  console.log(user.cart)
  
  res.render("cart",{user})
})

module.exports = router;
