const express = require("express");
const router = express.Router();
const model = require("../models/index");

//Route for Adding Notes
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

//Route for Get All Notes
router.get("/", async (req, res) => {
  try {
    const notes = await model.notes.findAll({
      where: { author: req.user.id }
    });
    if (notes) {
      res.status(200).json({
        status: "Found",
        message: "Getting all your notes",
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
      message: "Error getting notes"
    });
  }
});

//Route for update note
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  try {
    const checkNote = await model.notes.findOne({
      where: { id: req.params.id }
    });
    if (checkNote) {
      if (checkNote.author === req.user.id) {
        const updateNote = await model.notes.update(
          {
            title: title,
            description: description
          },
          { where: { id: req.params.id } }
        );
        const note = await model.notes.findOne({
          where: { id: req.params.id }
        });
        if (updateNote) {
          res.json({
            status: "Updated",
            message: "Note already updated",
            data: note
          });
        } else {
          res.status(400).json({
            status: "Error",
            message: "Notes failed to updated"
          });
        }
      } else {
        res.status(401).json({
          status: "Error",
          message: "Unauthorized"
        });
      }
    } else {
      res.status(400).json({
        status: "Error",
        message: "Notes not found"
      });
    }
  } catch (err) {
    res.status(401).json({
      status: "Error",
      message: "There's Error in Updating Notes"
    });
  }
});

module.exports = router;
