const express = require("express");
const router = express.Router();
const model = require("../models/index");
const bcrypt = require("bcryptjs");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(400).json({
        status: "Error",
        message: "Please Try Again 1"
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
            message: "Please Try Again 2"
          });
        }
      } catch (err) {
        res.status(400).json({
          status: "Error",
          message: "Please Try Again 3"
        });
      }
    }
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await model.users.findOne({
      where: {
        username: username
      }
    });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({
            status: "Error",
            message: "Please Try Again"
          });
        } else {
          if (result) {
            res.status(200).json({
              status: "Login Successful"
            });
          } else {
            res.status(406).json({
              status: "Mistake",
              message: "Wrong Password"
            });
          }
        }
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "User not Found"
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Please Try Again"
    });
  }
});

module.exports = router;
