import LecturerModel from "../models/lecturerModel";

const signupLecturer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await LecturerModel.findOne({ email: email })) {
      res.json({ error: "email already exists" });
    } else {
      var lecturer = new LecturerModel();
      lecturer.name = name;
      lecturer.email = email;
      lecturer.password = password;
      lecturer.qidList = [];

      lecturer
        .save()
        .then((data) => {
          res
            .status(200)
            .json({ lecturer: { name: data.name, email: data.email } });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const loginLecturer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lecturer = await LecturerModel.findOne({ email: email });
    if (lecturer) {
      if (password === lecturer.password) {
        res
          .status(200)
          .json({ lecturer: { name: lecturer.name, email: lecturer.email } });
      } else {
        res.status(400).json({ error: "password incorrect" });
      }
    } else {
      res.status(400).json({ error: "email incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getQuizList = async (req, res) => {
  try {
    const { email } = req.body;
    const lecturer = await LecturerModel.findOne({ email: email });
    if (lecturer) {
      res.status(200).json({ qidList: lecturer.qidList });
    } else {
      res.status(400).json({ error: "no quiz list" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default { signupLecturer, loginLecturer, getQuizList };
