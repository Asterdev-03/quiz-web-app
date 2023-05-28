import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizInfo, setQuizInfo] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [trace, setTrace] = useState(
    JSON.parse(sessionStorage.getItem("student_trace"))
  );
  const [timerValue, setTimerValue] = useState(
    parseInt(JSON.parse(sessionStorage.getItem("student_currentTimerValue")))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimerValue((prevValue) => {
        const newValue = prevValue - 1;
        sessionStorage.setItem(
          "student_currentTimerValue",
          JSON.stringify(newValue)
        );
        if (newValue === 0) {
          incrementTrace();
        }

        return newValue;
      });
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  });

  /* fetches quiz info to be diplayed using code key */
  useEffect(() => {
    fetch("http://localhost:5000/getQuizQuestions", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log("Quiz", data.quiz);
          setQuizInfo(data.quiz);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* fetches the result comparing selected options and correct options */
  const handleSubmitSelectedOptions = async () => {
    const optionsList = JSON.parse(
      sessionStorage.getItem("student_selectedOptionsList")
    );
    const quizresult = quizInfo;
    for (let i = 0; i < quizresult.length && i < optionsList.length; i++) {
      quizresult[i].selectedOption = optionsList[i];
    }
    console.log("Provided Answers", quizresult);
    await fetch("http://localhost:5000/setStudentResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        name: JSON.parse(sessionStorage.getItem("student_name")),
        quizresult: quizresult,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("StudentReport", data.result);
          navigate("/quiz/result", { replace: true });
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* stores the selected option list in session storage according to trace */
  const onSubmitClick = () => {
    const selectedOptionsList = JSON.parse(
      sessionStorage.getItem("student_selectedOptionsList")
    );
    selectedOptionsList.push(parseInt(selectedOption));
    sessionStorage.setItem(
      "student_selectedOptionsList",
      JSON.stringify(selectedOptionsList)
    );
    console.log(selectedOptionsList);

    incrementTrace();
  };

  const incrementTrace = () => {
    console.log("len", quizInfo.length);
    if (trace + 1 < quizInfo.length) {
      sessionStorage.setItem("student_trace", JSON.stringify(trace + 1));
      sessionStorage.setItem(
        "student_currentTimerValue",
        JSON.stringify(JSON.parse(sessionStorage.getItem("student_timerValue")))
      );
      setTimerValue(
        parseInt(
          JSON.parse(sessionStorage.getItem("student_currentTimerValue"))
        )
      );
      setTrace(trace + 1);
      setSelectedOption("");
    } else {
      handleSubmitSelectedOptions();
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Quiz</h2>
      <h3>Timer: {timerValue}</h3>
      <h3>{quizInfo ? quizInfo[trace].question : ""}</h3>
      <div>
        {quizInfo ? quizInfo[trace].options[0] : ""}
        <input
          type="radio"
          value="0"
          checked={selectedOption === "0"}
          onChange={handleOptionChange}
        />
      </div>
      <div>
        {quizInfo ? quizInfo[trace].options[1] : ""}
        <input
          type="radio"
          value="1"
          checked={selectedOption === "1"}
          onChange={handleOptionChange}
        />
      </div>
      <div>
        {quizInfo ? quizInfo[trace].options[2] : ""}
        <input
          type="radio"
          value="2"
          checked={selectedOption === "2"}
          onChange={handleOptionChange}
        />
      </div>
      <div>
        {quizInfo ? quizInfo[trace].options[3] : ""}
        <input
          type="radio"
          value="3"
          checked={selectedOption === "3"}
          onChange={handleOptionChange}
        />
      </div>
      <button onClick={onSubmitClick}>Submit</button>
    </div>
  );
};

export default Quiz;
