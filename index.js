const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const TeacherModel = require("./models/teachers");
const QuizzesModel = require("./models/quizzes");

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

      course
        .save()
        .then((data) => {
          res.status(200).json({ user: data });
        })
        .catch((error) => {
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
  const { qid, question, option1, option2, option3, option4, correctOption } =
    req.body;

  try {
    await QuizzesModel.findOneAndUpdate(
      { qid: qid },
      {
        $push: {
          quiz: {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
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
