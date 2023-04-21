const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  qid: {
    type: Number,
    required: true,
  },
  student: [
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        trim: true,
        required: true,
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
