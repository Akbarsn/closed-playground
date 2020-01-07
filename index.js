const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const auth = require("./auth/auth");
const port = 5000;
const router = require("./route/index");

app.use(express.json());

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
app.use('/', require('./route/index.js'));

app.listen(port, () => {
  console.log("Listening to " + port);
});
