import QuizzesModel from "../models/quizzesModel";

const updateQuiz = async (req, res) => {
  try {
    const { qid, question, options, correctOption } = req.body;
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
};

const getQuiz = async (req, res) => {
  try {
    const { qid } = req.body;
    const quiz = await QuizzesModel.findOne({ qid: qid });
    if (quiz) {
      res.status(200).json({ quiz: quiz });
    } else {
      res.status(400).json({ error: "no quiz info" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default { updateQuiz, getQuiz };
