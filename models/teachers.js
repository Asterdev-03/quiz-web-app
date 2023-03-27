const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  quizzes: {
    type: [
      {
        code: Number,
      },
    ],
    default: undefined,
  },
});

const TeacherModel = mongoose.model("teacher", teacherSchema);

module.exports = TeacherModel;
