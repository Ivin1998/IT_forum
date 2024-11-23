const mongoose = require("mongoose");
const answers = require("./answerModel");

const MultipleAnswersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Guest User",
    },
    email: {
      type: String,
      required: true,
    },
    qn_id: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: false,
    }, category:{
        type:[String],
        required:false,
        default:'others'
    },
    answers: [
      {
        email: {
          type: String,
          required: false,
        },
        answer: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      
    ],
  },
  {
    timestamps: true,
  }
);

const Multipleanswers = mongoose.model(
  "multipleanswers",
  MultipleAnswersSchema
);
module.exports = Multipleanswers;
