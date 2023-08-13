import ResultModel from "../models/resultModel";

const getResult = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      res.status(200).json({ result: result.students });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const joinQuiz = async (req, res) => {
  try {
    const { code } = req.body;
    if (await ResultModel.findOne({ code: code })) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ error: "no quiz found" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getQuizStatus = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      res.status(200).json({ status: result.status });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const setQuizStatus = async (req, res) => {
  try {
    const { code } = req.body;
    await ResultModel.findOneAndUpdate({ code: code }, { status: true })
      .then((data) => {
        res.status(200).json({ status: data.status });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const putStudentInfo = async (req, res) => {
  try {
    const { name, code } = req.body;
    await ResultModel.findOneAndUpdate(
      { code: code },
      {
        $push: {
          students: {
            name: name,
            marks: 0,
            status: "checking",
          },
        },
      }
    )
      .then((data) => {
        res.status(200).json({ timer: data.timerValue });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getQuizQuestions = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      var quizInfo = [];

      for (var i = 0; i < result.quizInfo.length; i++) {
        quizInfo.push({
          question: result.quizInfo[i].question,
          options: result.quizInfo[i].options,
        });
      }
      quizInfo.sort(() => Math.random() - 0.5);

      res.status(200).json({ quiz: quizInfo });
    } else {
      res.status(400).json({ error: "no question info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getStudentResult = async (req, res) => {
  try {
    const { code, name } = req.body;
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      const studentResult = result.students.find((st) => st.name === name);
      res.status(200).json({ user: studentResult });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const setStudentResult = async (req, res) => {
  try {
    const { code, name, quizresult } = req.body;
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      var marks = 0;
      var status = "";
      for (const obj1 of result.quizInfo) {
        for (const obj2 of quizresult) {
          if (obj1.question === obj2.question) {
            console.log(obj1.question);
            if (obj1.correctOption === obj2.selectedOption) {
              console.log(obj2.options[obj2.selectedOption]);
              marks = marks + 10;
            }
          }
        }
      }

      if (marks >= quizresult.length * 10 * 0.4) {
        status = "pass";
      } else {
        status = "fail";
      }
      await ResultModel.findOneAndUpdate(
        { code: code, "students.name": name },
        {
          $set: {
            "students.$.marks": marks,
            "students.$.status": status,
          },
        }
      )
        .then((data) => {
          res.status(200).json({ result: data.students });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    } else {
      res.status(400).json({ error: "no quiz info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default {
  getResult,
  joinQuiz,
  getQuizStatus,
  setQuizStatus,
  putStudentInfo,
  getQuizQuestions,
  getStudentResult,
  setStudentResult,
};
