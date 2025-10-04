const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();


router.get("/", (req, res) => {
  let error = req.flash("error")
  let success = req.flash("success")
  res.render("index",{error,success});
});

router.get("/shop",isLoggedin, (req, res) => {
  res.render("shop");
});

module.exports = router;
