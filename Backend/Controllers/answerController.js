const asyncHandler = require("express-async-handler");
const answers = require("../models/answerModel");
// const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const Multipleanswers = require("../models/multipleAnswersModel");

// const Answer = asyncHandler(async (req, res) => {
//   const { name,email, answer, question, category } = req.body;

//   const userId = await User.findOne({ email }, { _id: 1 });

//   const replyanswers = await answers.create({
//     name,
//     email,
//     question,
//     category,
//     answer
//   });

//   if (replyanswers) {
//     res.json({
//       _id: replyanswers.id,
//       user_id: userId._id,
//       name: replyanswers.name,
//       email: replyanswers.email,
//       question: question,
//       answer: replyanswers.answer,
//       category: replyanswers.category,
//       token: generateToken(replyanswers._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Error Occurred");
//   }
// });

const UpdateAnswer = asyncHandler(async (req, res) => {
  const { id, answerId, UpdatedAnswer } = req.body;

  const questionDoc = await Multipleanswers.findById(id);

  if (!questionDoc) {
    res.status(404);
    throw new Error("Question not found with the given qn_id");
  }

  const answerIndex = questionDoc.answers.findIndex(
    (ans) => ans._id.toString() === answerId
  );

  if (answerIndex === -1) {
    res.status(404);
    throw new Error("Answer not found with the given answerId");
  } else {
    questionDoc.answers[answerIndex].answer = UpdatedAnswer;
    await questionDoc.save();

    res.json({
      message: "Answer updated successfully",
      qn_id: id,
      updatedAnswer: questionDoc.answers[answerIndex],
    });
  }
});

const getAnswer = async (req, res) => {
  const feed = await Multipleanswers.find({}).sort({ createdAt: -1 });
  res.json({ feed });
};


const getquestionsAnswer = async (req, res) => {
  const { id, answerId } = req.params;

  const questionDoc = await Multipleanswers.findById(id);

  const answerIndex = questionDoc?.answers?.findIndex(
    (ans) => ans._id.toString() === answerId
  );

  if (answerIndex === -1) {
    res.status(404);
    throw new Error("Answer not found with the given answerId");
  } else {
     const Answer = questionDoc?.answers[answerIndex]?.answer;     
      res.json(Answer);

  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const Deleted = await Multipleanswers.deleteOne({ _id: id });
    res.json(Deleted);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  // Answer,
  getAnswer,
  UpdateAnswer,
  getquestionsAnswer,
  deleteQuestion,
  // getQuestion
};
