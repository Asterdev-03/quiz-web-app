import { useState } from "react";

const ResultPage = () => {
  const [code, setCode] = useState(0);

  const [result, setResult] = useState([
    {
      name: "a",
      marks: "b",
      status: "failed",
    },
  ]);

  const quizSetup = () => {
    console.log(code);
    fetch("http://localhost:5000/quizSetup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: 1680799851124,
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
    console.log(code);
  };

  const onRefreshClick = () => {
    fetch("http://localhost:5000/getResult")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log("result: ", data.user);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onResetCodeClick = async () => {
    setCode(Date.now() % 1000000);
    quizSetup();
  };

  return (
    <div>
      <h3>Code is {code}</h3>
      <button onClick={onResetCodeClick}>Reset Code</button>
      <h3>Result</h3>
      <button onClick={onRefreshClick}>Refresh</button>
    </div>
  );
};

export default ResultPage;
