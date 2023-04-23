const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  quiz: [
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
  student: [
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
  course: {
    type: String,
    trim: true,
    required: true,
  },
});

const ResultModel = mongoose.model("result", resultSchema);

module.exports = ResultModel;
