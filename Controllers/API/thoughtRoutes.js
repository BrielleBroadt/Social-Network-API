const router = require("express").Router();
const { User, Thought } = require("../../models");
const mongoose = require("mongoose");
// get request for thoughts
router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find();
    return res.json(allThoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});
