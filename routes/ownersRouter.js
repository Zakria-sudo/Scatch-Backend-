const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV == "development")
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0)
      return res.status(500).send("An owner already exists");
    let { fullname, email, password } = req.body;
    let ownerCreated = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(ownerCreated);
    // res.send("It is working")
  });

router.get("/", (req, res) => {
  res.send("Owners Router");
});

module.exports = router;
