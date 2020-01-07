const express = require("express");
const router = express.Router();
const model = require("../models/index");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", { 
    successRedirect:'/dashboard' }),
  function(req, res) {
    res.json({
      message: "Berhasil Login",
      data: req.user
    });
  }
);

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      res.status(400).json({
        status: "Error",
        message: "Please Try Again "
      });
    } else {
      try {
        const user = await model.users.create({
          name,
          email,
          username,
          password: hash
        });
        if (user) {
          res.status(201).json({
            status: "Registered",
            message: "Go Login"
          });
        } else {
          res.status(400).json({
            status: "Error",
            message: "Please Try Again "
          });
        }
      } catch (err) {
        res.status(400).json({
          status: "Error",
          message: "Error creating user"
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error when hashing"
    });
  }
});

module.exports = router;
