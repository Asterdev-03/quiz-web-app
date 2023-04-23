import { useEffect, useState } from "react";
import QuizResult from "../../components/quizResult/QuizResult";

const ResultPage = () => {
  const [result, setResult] = useState([]);

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
        if (data.user) {
          console.log(data.user);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        if (data.user) {
          console.log("result: ", data.user);
          setResult(data.user);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>
        Code is {JSON.parse(sessionStorage.getItem("lecturerInfo_QuizCode"))}
      </h3>
      <h3>Result</h3>
      <QuizResult students={result} />
    </div>
  );
};

export default ResultPage;
