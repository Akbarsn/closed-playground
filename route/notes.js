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

router.get("/", async (req, res) => {
  try {
    const notes = await model.notes.findAll({
      where: { author: req.user.id }
    });
    if (notes) {
      res.status(200).json({
        status: "Found",
        message: "Your notes",
        data: notes
      });
    } else {
      res.status(400).json({
        status: "Not Found",
        message: "Notes not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Error when notes"
    });
  }
});

module.exports = router;
