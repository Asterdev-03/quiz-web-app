/* initialize database models */
const LecturerModel = require("./models/lecturerModel");
const QuizzesModel = require("./models/quizzesModel");
const ResultModel = require("./models/resultModel");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ["https://quiz-web-app-cyan.vercel.app"],
  methods: ["POST","GET"],
  credentials:true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGODBURL;
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

app.get("/", (req,res)=>{
  res.json("Listening")
})
/* 
import LecturerRouter from "./routes/lecturerModel.routes";
import QuizzesRouter from "./routes/quizzesModel.routes";
import ResultRouter from "./routes/resultModel.routes";

app.use("/api/lecturer", LecturerRouter);
app.use("/api/quizzes", QuizzesRouter);
app.use("/api/result", ResultRouter);
 */

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
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
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
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
});

app.post("/createQuiz", async (req, res) => {
  const { email, qid, courseName, timer, poolSize } = req.body;

  try {
    await LecturerModel.findOneAndUpdate(
      { email: email },
      {
        $push: {
          qidList: qid,
        },
      }
    ).catch((error) => {
      res.status(400).json({ error });
    });

    var quiz = new QuizzesModel();
    quiz.qid = qid;
    quiz.courseName = courseName;
    quiz.quizInfo = [];
    quiz.timer = timer;
    quiz.poolSize = poolSize;

    quiz
      .save()
      .then((data) => {
        res.status(200).json({ quiz: data.qid });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
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
          quizInfo: {
            question: question,
            options: options,
            correctOption: correctOption,
          },
        },
      },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({ quiz: data.qid });
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
        if ((await ResultModel.findOne({ code: code })) === null) {
          var result = new ResultModel();
          result.code = code;
          result.courseName = data.courseName;
          result.students = [];
          result.status = false;
          result.timerValue = data.timer;
          const quiz = await QuizzesModel.findOne({ qid: qid });
          quiz.quizInfo.sort(() => Math.random() - 0.5);
          result.quizInfo = quiz.quizInfo.slice(0, data.poolSize);

          result
            .save()
            .then((data) => {
              res.status(200).json({ result: data.code });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getQuizList", async (req, res) => {
  const { email } = req.body;
  try {
    const lecturer = await LecturerModel.findOne({ email: email });
    if (lecturer) {
      res.status(200).json({ qidList: lecturer.qidList });
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
    const quiz = await QuizzesModel.findOne({ qid: qid });
    if (quiz) {
      res.status(200).json({ quiz: quiz });
    } else {
      res.status(400).json({ error: "no quiz info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/removeQuizInfo", async (req, res) => {
  const { qid, email } = req.body;
  try {
    await QuizzesModel.findOneAndDelete({ qid: qid });
    await LecturerModel.findOneAndDelete(
      { email: email },
      {
        $pop: {
          qidList: qid,
        },
      }
    );

    res.status(200).json({ quiz: quiz });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getResult", async (req, res) => {
  const { code } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      res.status(200).json({ result: result.students });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/joinQuiz", async (req, res) => {
  const { code } = req.body;

  try {
    if (await ResultModel.findOne({ code: code })) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ error: "no quiz found" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/getQuizStatus", async (req, res) => {
  const { code } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      res.status(200).json({ status: result.status });
    } else {
      res.status(400).json({ error: "no result info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/setQuizStatus", async (req, res) => {
  const { code } = req.body;
  try {
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
});

app.post("/putStudentInfo", async (req, res) => {
  const { name, code } = req.body;

  try {
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
});

app.post("/getQuizQuestions", async (req, res) => {
  const { code } = req.body;
  try {
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
});

app.post("/setStudentResult", async (req, res) => {
  const { code, name, quizresult } = req.body;
  try {
    const result = await ResultModel.findOne({ code: code });
    if (result) {
      var marks = 0;
      var status = "";
      for (const obj1 of result.quizInfo) {
        for (const obj2 of quizresult) {
          if (obj1.question === obj2.question) {
            if (obj1.correctOption === obj2.selectedOption) {
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
});

app.post("/getStudentResult", async (req, res) => {
  const { code, name } = req.body;
  try {
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
});
