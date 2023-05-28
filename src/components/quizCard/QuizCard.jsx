import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = (props) => {
  const [quiz, setQuiz] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  const navigate = useNavigate();

  const handleUpdateClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    navigate("/dashboard/updatequiz", { replace: true });
  };

  /* set whether to show or hide the quiz info */
  const handleViewClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    setShowQuestions(!showQuestions);
  };

  /* generate code for current quiz and stores it in session storage */
  const handleStartQuizClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    sessionStorage.setItem(
      "lecturerInfo_QuizCode",
      JSON.stringify(Date.now() % 1000000)
    );
    navigate("/dashboard/resultreport", { replace: true });
  };

  /* fetches quiz info for the quiz card */
  useEffect(() => {
    fetch("http://localhost:5000/getQuizInfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: props.qid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log("Quiz", data.quiz);
          setQuiz(data.quiz);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.qid]);

  return (
    <div>
      <h3>{quiz.courseName ? quiz.courseName : ""}</h3>
      <button onClick={handleViewClick}>View</button>
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={handleStartQuizClick}>StartQuiz</button>
      {/* Displays the Question and its options when view button is clicked */}
      {showQuestions && (
        <div>
          <h3>Quiz Info</h3>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Options</th>
                <th>correctOption</th>
              </tr>
            </thead>
            <tbody>
              {quiz.quizInfo.map((qInfo) => (
                <tr>
                  <td>{qInfo.question}</td>
                  <td>
                    {qInfo.options.map((option) => (
                      <tr>{option}</tr>
                    ))}
                    <br />
                  </td>
                  <td>{qInfo.options[qInfo.correctOption]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
