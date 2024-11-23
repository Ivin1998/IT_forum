const asyncHandler = require("express-async-handler");
const answers = require("../models/answerModel");
const generateToken = require("../utils/generateToken");
const Multipleanswers = require("../models/multipleAnswersModel");


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

const searchAnswer = async (req,res) =>{
  const  {text} = req.params;
  try {
  
   // Handle empty or undefined text
   if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Search text is required" });
  
  }else{
    const feed = await Multipleanswers.find({
      question: { $regex: text, $options: "i" }, // Case-insensitive partial match
    });
    res.json({
      feed
    });
  }
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = {
  getAnswer,
  UpdateAnswer,
  getquestionsAnswer,
  deleteQuestion,
  searchAnswer
};
