const express = require("express");
const router = express.Router();
const notes = require("./notes");
const auth = require("../auth/auth");
const { isLogin } = require("../auth/middleware");

//Welcome page
router.get("/", (req, res) => {
  res.json({
    message: "Welcome Page"
  });
});

router.get("/dashboard", isLogin, (req, res) => {
  res.json({
    status: "Authenticated",
    data: req.user
  });
});

router.get("/error", (req, res) =>
  res.status(400).json({
    status: "Error",
    message: "Please Try Again"
  })
);

router.use("/auth", auth);
router.use("/notes", isLogin, notes);

module.exports = router;
