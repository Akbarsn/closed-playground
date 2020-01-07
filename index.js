const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const port = 5000;

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

app.use("/", require("./route/index.js"));

function notFound(req, res, next) {
  res.status(404);
  res.json({
    status: "Error",
    message: "Oops, page not found, try again later"
  });
}

app.use(notFound);

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: "Error",
    error: err.message
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening to " + port);
});
