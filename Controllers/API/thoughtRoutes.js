const router = require("express").Router();
const { User, Thought } = require("../../models");
const mongoose = require("mongoose");
// Get request for "thoughts"
router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find();
    return res.json(allThoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get request for "thoughtID"
router.get("/:thoughtId", async (req, res) => {
    try {
      const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!singleThought) {
        return res.status(400).json({ message: "No thought with that ID" });
      }
      return res.json(singleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// POST requests to create a new Thought and associate it with  User
  router.post("/", async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      const userId = req.body.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: "No user with that ID" });
      }
  
      user.thoughts.push(newThought._id);
      await user.save();
  
      return res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  