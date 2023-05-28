import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadQuestion = () => {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);

  const navigate = useNavigate();

  const handleSaveClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const onQuizQuestionChange = (event) => {
    setQuizQuestion(event.target.value);
  };

  const onQuizOptionChange = (index, event) => {
    const newQuizOptions = [...quizOptions];
    newQuizOptions[index] = event.target.value;
    setQuizOptions(newQuizOptions);
  };

  const onCorrectOptionChange = (event) => {
    setCorrectOption(event.target.value);
  };

  /* uploads the question and options to quiz with qid key */
  const onSubmitClick = () => {
    fetch("http://localhost:5000/uploadQuestion", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        question: quizQuestion,
        options: quizOptions,
        correctOption: parseInt(correctOption),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log(data.quiz);
          setCorrectOption(0);
          setQuizOptions([]);
          setQuizQuestion("");
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Add Questions</h3>
      <button onClick={handleSaveClick}>Save</button>
      <form>
        <input
          type="text"
          placeholder="Enter Question"
          onChange={onQuizQuestionChange}
        />
        <input
          type="text"
          placeholder="Question 1"
          onChange={(event) => {
            onQuizOptionChange(0, event);
          }}
        />
        <input
          type="text"
          placeholder="Question 2"
          onChange={(event) => {
            onQuizOptionChange(1, event);
          }}
        />
        <input
          type="text"
          placeholder="Question 3"
          onChange={(event) => {
            onQuizOptionChange(2, event);
          }}
        />
        <input
          type="text"
          placeholder="Question 4"
          onChange={(event) => {
            onQuizOptionChange(3, event);
          }}
        />
        <select onChange={onCorrectOptionChange}>
          <option value="0">a</option>
          <option value="1">b</option>
          <option value="2">c</option>
          <option value="3">d</option>
        </select>
        <button onClick={onSubmitClick}>Submit</button>
      </form>
    </div>
  );
};

export default UploadQuestion;
