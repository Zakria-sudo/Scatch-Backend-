const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message); // 👈 log this
    req.flash("error", "Invalid or expired session. Please login again.");
    res.redirect("/");
  }
};
