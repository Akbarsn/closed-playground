const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const auth = require("./auth/auth");
const port = 5000;

app.use(express.json())

//Passport Config
require("./config/passport")(passport);

//Express body parser
app.use(express.urlencoded({ extended: true }));

//Express session config
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Test")
});

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
