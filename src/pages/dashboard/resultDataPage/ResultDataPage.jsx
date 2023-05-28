import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultDataPage = () => {
  const [resultReport, setResultReport] = useState([]);
  const [readyQuiz, setReadyQuiz] = useState(false);

  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleStartQuizClick = () => {
    setReadyQuiz(true);
    fetch("http://localhost:5000/setQuizStatus", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log(data.status);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* setup the quiz with keys qid and code */
  useEffect(() => {
    fetch("http://localhost:5000/quizSetup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        code: JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* fetches the result report of the quiz */
  useEffect(() => {
    fetch("http://localhost:5000/getResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("result: ", data.result);
          setResultReport(data.result);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <button onClick={handleExitClick}>Exit</button>
      <h3>
        Code is {JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode"))}
      </h3>
      {!readyQuiz ? (
        <button onClick={handleStartQuizClick}>Start Quiz</button>
      ) : (
        <div>
          {/* Displays the Result Report */}
          <h3>Result</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resultReport.map((student) => (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                  <td>{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultDataPage;
