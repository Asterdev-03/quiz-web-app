const mongoose = require("mongoose");

const quizzesSchema = mongoose.Schema({
  qid: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    trim: true,
  },
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  quiz: [
    {
      question: {
        type: String,
        trim: true,
        required: true,
      },
      option1: {
        type: String,
        trim: true,
        required: true,
      },
      option2: {
        type: String,
        trim: true,
        required: true,
      },
      option3: {
        type: String,
        trim: true,
      },
      option4: {
        type: String,
        trim: true,
      },
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],
});

const QuizzesSchema = mongoose.model("quizzes", quizzesSchema);

module.exports = QuizzesSchema;
