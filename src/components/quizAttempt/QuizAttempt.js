import { useState, useEffect } from "react";

const QuizAttempt = (props) => {
  const [quizInfo, setQuizInfo] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [trace, setTrace] = useState(
    JSON.parse(sessionStorage.getItem("student_trace"))
  );

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("student_trace")) !== 0) {
      props.onPageChange();
    }
    fetch("http://localhost:5000/getQuizQuestions", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_code")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log("Quiz", data.user);
          setQuizInfo(data.user);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitSelectedAnswers = async () => {
    await fetch("http://localhost:5000/setStudentResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_code")),
        name: JSON.parse(sessionStorage.getItem("student_name")),
        selectedOptionsList: JSON.parse(
          sessionStorage.getItem("student_selectedOptionsList")
        ),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log("Quiz", data.user);
          props.onPageChange();
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

    console.log("len", quizInfo.length);
    if (trace + 1 < quizInfo.length) {
      sessionStorage.setItem("student_trace", JSON.stringify(trace + 1));
      setTrace(trace + 1);
      setSelectedOption("");
    } else {
      submitSelectedAnswers();
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h3>Questions</h3>
      <div>{quizInfo ? quizInfo[trace].question : ""}</div>
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

export default QuizAttempt;
