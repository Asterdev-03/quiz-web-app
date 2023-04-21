import { useEffect, useState } from "react";
import QuizResult from "../../components/quizResult/QuizResult";

const ResultPage = () => {
  const [code, setCode] = useState(Date.now() % 1000000);
  const [result, setResult] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("lecturerInfo_QuizCode", JSON.stringify(code));

    fetch("http://localhost:5000/quizSetup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        code: code,
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
  }, [code]);

  useEffect(() => {
    fetch("http://localhost:5000/getResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
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

  const onResetCodeClick = async () => {
    setCode(Date.now() % 1000000);
  };

  return (
    <div>
      <h3>Code is {code}</h3>
      <button onClick={onResetCodeClick}>Reset Code</button>
      <h3>Result</h3>
      <button>Refresh</button>
      <QuizResult students={result} />
    </div>
  );
};

export default ResultPage;
