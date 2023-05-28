const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  timerValue: {
    type: Number,
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
  students: [
    {
      name: {
        type: String,
        trim: true,
      },
      marks: {
        type: Number,
      },
      status: {
        type: String,
        trim: true,
      },
    },
  ],
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
});

const ResultModel = mongoose.model("result", resultSchema);

module.exports = ResultModel;
