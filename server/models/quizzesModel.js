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
  timer: {
    type: Number,
    trim: true,
    required: true,
  },
  poolSize: {
    type: Number,
    trim: true,
    required: true,
  },
  quizInfo: [
    {
      question: {
        type: String,
        trim: true,
        required: true,
      },
      options: [
        {
          type: String,
          trim: true,
          required: true,
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
    },
  ],
});

const QuizzesModel = mongoose.model("quizzes", quizzesSchema);

module.exports = QuizzesModel;
