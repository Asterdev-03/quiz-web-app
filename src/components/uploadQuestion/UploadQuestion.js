import React, { useState } from "react";

const UploadQuestion = (props) => {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleSaveClick = () => {
    props.onPageChange();
  };

  const onQuizQuestionChange = (event) => {
    setQuizQuestion(event.target.value);
  };
  const onQuizOptionChange = (event) => {
    setQuizOptions((prev) => [...prev, event.target.value]);
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
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setCorrectOption(0);
    setQuizOptions([]);
    setQuizQuestion("");
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
          onChange={onQuizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 2"
          onChange={onQuizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 3"
          onChange={onQuizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 4"
          onChange={onQuizOptionChange}
        />
        <select onChange={onCorrectOptionChange}>
          <option value="0">a</option>
          <option value="1">b</option>
          <option value="2">c</option>
          <option value="3">d</option>
        </select>
      </form>
      <button type="submit" onClick={onSubmitClick}>
        Submit
      </button>
    </div>
  );
};

export default UploadQuestion;
