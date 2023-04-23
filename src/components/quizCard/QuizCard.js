import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = (props) => {
  const [quizInfo, setQuizInfo] = useState({});

  const navigate = useNavigate();

  const onUpdateClick = () => {
    sessionStorage.setItem(
      "lecturerInfo_Qid_Update",
      JSON.stringify(quizInfo.qid)
    );
  };

  const onStartQuizClick = () => {
    sessionStorage.setItem(
      "lecturerInfo_Qid_Update",
      JSON.stringify(quizInfo.qid)
    );
    sessionStorage.setItem(
      "lecturerInfo_QuizCode",
      JSON.stringify(Date.now() % 1000000)
    );
    navigate("/result");
  };

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
        if (data.user) {
          console.log("Quiz", data.user);
          setQuizInfo(data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.qid]);

  return (
    <div>
      <h3>{quizInfo.courseName ? quizInfo.courseName : ""}</h3>
      <button>View</button>
      <button onClick={onUpdateClick}>Update</button>
      <button onClick={onStartQuizClick}>StartQuiz</button>
    </div>
  );
};

export default QuizCard;
