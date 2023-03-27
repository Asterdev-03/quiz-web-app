const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const TeacherModel = require("./models/teachers");

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

app.post("/getRegister", (req, res) => {
  const { name, password } = req.body;

  var teacherModel = new TeacherModel();
  teacherModel.name = name;
  teacherModel.password = password;
  teacherModel.quizzes = [];

  teacherModel
    .save()
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      console.error(err);
    });
});
