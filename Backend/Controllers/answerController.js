const asyncHandler = require("express-async-handler");
const answers = require("../models/answerModel");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const questions = require("../models/questionModel");

const Answer = asyncHandler(async (req, res) => {
  const { email, answer, question, category } = req.body;

  const userId = await User.findOne({ email }, { _id: 1 });
  
  const replyanswers = await answers.create({
    email,
    question,
    category
  });

  if (replyanswers) {
    res.json({
      _id: replyanswers.id,
      user_id: userId._id,
      email: replyanswers.email,
      question: question,
      answer: replyanswers.answer,
      category: replyanswers.category,
      token: generateToken(replyanswers._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

const UpdateAnswer = asyncHandler(async (req, res) => {
  const { id, answer } = req.body;

  const UpdateAnswers = await answers.findByIdAndUpdate(id, {
    answer,
  });

  if (UpdateAnswers) {
    res.json({
      user_id: UpdateAnswers._id,
      email: UpdateAnswers.email,
      answer: UpdateAnswers.answer,
      token: generateToken(UpdateAnswers._id),
    });
  }
});

const getAnswer = async (req, res) => {
  const feed = await answers.find({}).sort({ createdAt: -1 });
  res.json({ feed });
};

const getquestionsAnswer = async (req, res) => {
  const { id } = req.query;
  try {
    const Replyanswer = await answers.findById(id, { answer: 1 }); //added projection
    res.json({ Replyanswer });
  } catch (error) {
    console.log(error);
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const Deleted = await answers.deleteOne({ _id: id });
    res.json(Deleted);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Answer,
  getAnswer,
  UpdateAnswer,
  getquestionsAnswer,
  deleteQuestion,
};
