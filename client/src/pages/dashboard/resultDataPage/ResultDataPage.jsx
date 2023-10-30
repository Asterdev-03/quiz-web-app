import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizTable from "../../../components/quizTable/QuizTable";

const ResultDataPage = () => {
  /* const [resultReport, setResultReport] = useState([]); */
  const [readyQuiz, setReadyQuiz] = useState(
    JSON.parse(sessionStorage.getItem("lecturerInfo_status"))
  );

  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleStartQuizClick = () => {
    const status = JSON.parse(sessionStorage.getItem("lecturerInfo_status"));
    sessionStorage.setItem("lecturerInfo_status", JSON.stringify(!status));
    setReadyQuiz(JSON.parse(sessionStorage.getItem("lecturerInfo_status")));

    fetch("https://juiz-server.onrender.com/setQuizStatus", {
      method: "post",
      
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
    fetch("https://juiz-server.onrender.com/quizSetup", {
      method: "post",
      
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
  /*   useEffect(() => {
    fetch("https://juiz-server.onrender.com/getResult", {
      method: "post",
      
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
 */
  return (
    <div className="w-screen min-h-screen bg-gray-700 p-5">
      <button
        class="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleExitClick}
      >
        Exit
      </button>
      <div>
        <h3 className="text-4xl text-indigo-50 m-3">
          Code is {JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode"))}
        </h3>
        {!readyQuiz ? (
          <button
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleStartQuizClick}
          >
            Start Quiz
          </button>
        ) : (
          <QuizTable
            quizCode={JSON.parse(
              sessionStorage.getItem("lecturerInfo_QuizCode")
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ResultDataPage;
