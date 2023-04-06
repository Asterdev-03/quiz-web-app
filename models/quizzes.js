const mongoose = require("mongoose");

const quizzesSchema = mongoose.Schema({
  _id: String,
  code: String,
  courseName: String,
  quiz: [
    {
      title: String,
      qstn1: String,
      qstn2: String,
      qstn3: String,
      qstn4: String,
      optn: String,
    },
  ],
  currentQuiz: [
    {
      title: String,
      qstn1: String,
      qstn2: String,
      qstn3: String,
      qstn4: String,
      optn: String,
    },
  ],
});

const QuizzesSchema = mongoose.model("quizzes", quizzesSchema);

module.exports = QuizzesSchema;
