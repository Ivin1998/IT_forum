const asyncHandler = require("express-async-handler");
const Multipleanswers = require("../models/multipleAnswersModel");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const answers = require("../models/answerModel");

const AnswerMapping = asyncHandler(async (req, res) => {
  const { name, email, question, qn_id: id, answer, category } = req.body;

  const userId = await User.findOne({ email }, { _id: 1 });
  if (!userId) {
    res.status(404);
    throw new Error("User not found with the given email");
  }

  //update the document
  if (id) {
    const QuestionExists = await Multipleanswers.findById(id);

    if (!QuestionExists) {
      res.status(404);
      throw new Error("Question not found with the given qn_id");
    }
    const updatedMappedAnswers = await Multipleanswers.updateOne(
      { _id: id },
      { $push: { answers: { email, answer } } }
    );

    if (updatedMappedAnswers.modifiedCount > 0) {
      const updatedDocument = await Multipleanswers.findById(id);

      res.json({
        message: "Answer added successfully",
        qn_id: id,
        question: updatedDocument.question,
        answers: updatedDocument.answers,
        token: generateToken(updatedMappedAnswers._id),
      });
    } else {
      res.status(400);
      throw new Error("Error occurred while adding the new answer");
    }
  } else {
    // If `qn_id` is not provided, create a new document
    const MappedAnswers = await Multipleanswers.create({
      name,
      email,
      category,
      question
     });

    if (MappedAnswers) {
      res.json({
        message: "New question and answer created successfully",
        _id: MappedAnswers.id,
        question: MappedAnswers.question,
        category:MappedAnswers.category,
        answers:MappedAnswers.answers,
        user_id: userId._id,
        token: generateToken(MappedAnswers._id),
      });
    } else {
      res.status(400);
      throw new Error("Error occurred while creating the new question");
    }
  }
});

module.exports = { AnswerMapping };
