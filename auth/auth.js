const express = require("express");
const router = express.Router();
const model = require("../models/index");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function(username, password, done) {
    const user = await model.users.findOne({
      where: {
        username: username
      }
    });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        } else {
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      });
    } else {
      return done(null, false);
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/error" }),
  function(req, res) {
    res.redirect("/success?username=" + req.user.username);
  }
);

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashing = await bcrypt.hash(password, 10);
  if (!hashing) {
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
        message: "Please Try Again "
      });
    }
  }
});


module.exports = router;
