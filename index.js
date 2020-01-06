const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const users = require("./auth/auth");
const model = require("./models/index");
const port = 5000;

app.use(express.json());
app.use(
  session({
    secret: "qwertyuiop",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await model.users.findOne({ where: { id: id } });
    if (user) {
      cb(null, user);
    } else {
      cb(null, false);
    }
  } catch (err) {
    cb(err);
  }
});

app.get("/success", (req, res) =>
  res.send("Welcome " + req.query.username + "!!")
);

app.get("/error", (req, res) =>
  res.status(400).json({
    status: "Error",
    message: "Please Try Again"
  })
);

app.use("/auth", users);

app.get("/test", isLoggedIn, (req, res) => {
  res.json({
    message: "Berhasil login"
  });
});

function isLoggedIn(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect("/error");
}

app.listen(port, () => {
  console.log("Listening to " + port);
});
