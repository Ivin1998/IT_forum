const asyncHandler = require("express-async-handler");
const questions = require("../models/questionModel");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const question = asyncHandler(async (req, res) => {
  const { email, description } = req.body;

  const userId = await User.findOne({ email }, { _id: 1 });

  if (!userId) {
    res.status(400);
    throw new Error("User details not exist");
  }
  const userquestion = await questions.create({
    email,
    description,
  });

  if (userquestion) {
    res.json({
      _id: userquestion.id,
      user_id: userId._id,
      email: userquestion.email,
      question: userquestion.description,
      token: generateToken(userquestion._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

module.exports = { question };
