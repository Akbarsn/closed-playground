const express = require("express");
const router = express.Router();
const model = require("../models/index");

router.post("/login", async (req, res) => {
  try {
    const user = await model.users.findOne({
      where: { username: req.body.username }
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
      error:err
    });
  }
});

module.exports = router;
