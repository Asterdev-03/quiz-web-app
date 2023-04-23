const mongoose = require("mongoose");

const lecturerSchema = mongoose.Schema({
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
  qidList: {
    type: [String],
  },
});

const LecturerModel = mongoose.model("lecturer", lecturerSchema);

module.exports = LecturerModel;
