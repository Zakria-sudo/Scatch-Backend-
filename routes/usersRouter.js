const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");


router.get("/", (req,res)=>{
    res.send("Users Router")
})

router.post("/create", async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let userCreated = await userModel.create({
      fullname,
      email,
      password,
    });
    res.send(userCreated);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
});
module.exports = router