const express = require("express");
const router = express.Router();
const model = require("../models/index");
const bcrypt = require("bcryptjs");
require("dotenv").config();

router.post("/register",async (req, res) => {
  const {
    name,
    email,
    username,
    password
  } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(400).json({
        status: "Error",
        message: "Please Try Again 1"
      })
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
        })
      }
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await model.users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (user) {
      if (user.password === req.body.password) {
        res.json({
          status: "Login"
        });
      } else {
        res.json({
          status: "Password Salah"
        });
      }
    } else {
      res.json({
        status: "User tidak ditemukan"
      });
    }
  } catch (err) {
    res.json({
      status: "Error",
      error: err
    });
  }
});

module.exports = router;