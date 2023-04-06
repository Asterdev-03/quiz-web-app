const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  quizzes: [
    {
      qid: {
        type: String,
        trim: true,
      },
    },
  ],
});

const TeacherModel = mongoose.model("teacher", teacherSchema);

module.exports = TeacherModel;
