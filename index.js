const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const TeacherModel = require("./models/teachers");
const QuizzesModel = require("./models/quizzes");
const ResultModel = require("./models/result");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

const dbUrl =
  "mongodb+srv://<dbname>:<password>@cluster0.h0lahrq.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
/* 
app.get("/insert", (req, res) => {
  var channelModel = new ChannelModel();
  channelModel.name = "ABCD";
  channelModel.type = "Tecc";

  channelModel
    .save()
    .then(() => {
      res.status(200).send({ msg: "Inserted to DB" });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/read", (req, res) => {
  ChannelModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/update", (req, res) => {
  ChannelModel.findByIdAndUpdate("64170bcf92102d0de8f0df9b", { name: "hi" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/remove", (req, res) => {
  ChannelModel.findOneAndDelete({ name: "hi" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
 */

/* app.get("/getData", (req, res) => {
  res.send("WELCOME");
});
 */

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (await TeacherModel.findOne({ email: email })) {
      res.json({ error: "email exists" });
    } else {
      var teacherModel = new TeacherModel();
      teacherModel.name = name;
      teacherModel.email = email;
      teacherModel.password = password;
      teacherModel.quizzes = [];

      teacherModel
        .save()
        .then((data) => {
          res.status(200).json({ user: data });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await TeacherModel.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.status(200).json({ user: user });
      } else {
        res.status(400).json({ error: "password incorrect" });
      }
    } else {
      res.status(400).json({ error: "email incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/createQuiz", async (req, res) => {
  const { email, qid, courseName } = req.body;

  try {
    if (await TeacherModel.findOne({ "quizzes.qid": qid })) {
      res.json({ error: "quiz already exits" });
    } else if (await QuizzesModel.findOne({ courseName: courseName })) {
      res.json({ error: "course already exits" });
    } else {
      const user = await TeacherModel.findOne({ email: email });
      user.quizzes.push({ qid: qid });

      var course = new QuizzesModel();
      course.courseName = courseName;
      course.qid = qid;
      course.quiz = [];

      course.save().catch((error) => {
        res.status(400).json({ error });
      });
      user
        .save()
        .then((data) => {
          res.status(200).json({ user: data });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/uploadQuestion", async (req, res) => {
  const { qid, question, options, correctOption } = req.body;

  try {
    await QuizzesModel.findOneAndUpdate(
      { qid: qid },
      {
        $push: {
          quiz: {
            question: question,
            options: options,
            correctOption: correctOption,
          },
        },
      }
    )

      .then((data) => {
        res.status(200).json({ user: data });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/quizSetup", async (req, res) => {
  const { qid, code } = req.body;
  try {
    await QuizzesModel.findOneAndUpdate({ qid: qid }, { code: code })
      .then(async (data) => {
        const result = await ResultModel.findOne({ code: code });
        if (result === null) {
          var resultModel = new ResultModel();
          resultModel.code = code;
          resultModel.course = data.courseName;
          resultModel.student = [];
          const quizModel = await QuizzesModel.findOne({ qid: qid });

          const shuffledQuestions = quizModel.quiz.sort(
            () => Math.random() - 0.5
          );
          resultModel.quiz = quizModel.quiz;

          resultModel
            .save()
            .then((data) => {
              res.status(200).json({ user: data });
            })
            .catch((error) => {
              res.status(400).json({ error: "aa" });
            });
        }
      })
      .catch((error) => {
        res.status(400).json({ error: "zzz" });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/joinQuiz", async (req, res) => {
  const { name, code } = req.body;

  try {
    await ResultModel.findOneAndUpdate(
      { code: code },
      {
        $push: {
          student: {
            name: name,
            marks: 0,
            status: "checking",
          },
        },
      }
    )
      .then((data) => {
        res.status(200).json({ user: data });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error: "nnn" });
  }
});

app.post("/getQuizList", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await TeacherModel.findOne({ email: email });
    if (user) {
      var qidList = [];
      for (var i = 0; i < user.quizzes.length; i++)
        qidList.push(user.quizzes[i].qid);

      res.status(200).json({ user: qidList });
    } else {
      res.status(400).json({ error: "no quiz list" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getQuizInfo", async (req, res) => {
  const { qid } = req.body;
  try {
    const user = await QuizzesModel.findOne({ qid: qid });
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(400).json({ error: "no quiz info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getResult", async (req, res) => {
  const { code } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      res.status(200).json({ user: result.student });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getQuizQuestions", async (req, res) => {
  const { code } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      var quizInfo = [];

      for (var i = 0; i < result.quiz.length; i++) {
        quizInfo.push({
          question: result.quiz[i].question,
          options: result.quiz[i].options,
        });
      }

      res.status(200).json({ user: quizInfo });
    } else {
      res.status(400).json({ error: "no question info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/setStudentResult", async (req, res) => {
  const { code, name, selectedOptionsList } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      var score = 0;
      var status = "";
      for (var i = 0; i < selectedOptionsList.length; i++) {
        if (selectedOptionsList[i] === result.quiz[i].correctOption) {
          score = score + 10;
        }
      }
      if (score >= selectedOptionsList.length * 10 * 0.4) {
        status = "pass";
      } else {
        status = "fail";
      }
      await ResultModel.findOneAndUpdate(
        { code: code, "student.name": name },
        {
          $set: {
            "student.$.marks": score,
            "student.$.status": status,
          },
        }
      )
        .then((data) => {
          console.log(data);
          res.status(200).json({ user: data });
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
});

app.post("/getStudentResult", async (req, res) => {
  const { code, name } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      const studentResult = result.student.find((st) => st.name === name);
      console.log(studentResult);
      res.status(200).json({ user: studentResult });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
