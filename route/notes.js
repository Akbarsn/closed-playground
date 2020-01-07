const express = require("express");
const router = express.Router();
const model = require("../models/index");

router.post("/add", async (req, res) => {
  const { title, description } = req.body;
  const author = req.user.id;
  try {
    const note = await model.notes.create({
      title,
      description,
      author
    });
    if (note) {
      res.status(200).json({
        status: "Succeed",
        message: "Notes added"
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: "Notes failed to added"
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Notes failed to added",
      error: err.message
    });
  }
});

module.exports = router;
