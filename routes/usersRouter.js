const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, loginUser } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("Users Router");
});

router.post("/create",createUser);

router.post("/login", loginUser);
module.exports = router;
