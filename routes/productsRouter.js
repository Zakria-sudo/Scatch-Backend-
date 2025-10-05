const express = require("express");
const router = express.Router();
const uplaod = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("Products Router");
});

router.post("/create", uplaod.single("pImage"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success","Product created successfully!")
    return res.redirect("/owners/admin")
    
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
