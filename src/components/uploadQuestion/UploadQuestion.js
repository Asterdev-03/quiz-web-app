import React, { useState } from "react";

const UploadQuestion = (props) => {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOption1, setQuizOption1] = useState("");
  const [quizOption2, setQuizOption2] = useState("");
  const [quizOption3, setQuizOption3] = useState("");
  const [quizOption4, setQuizOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("a");

  const handleClick = () => {
    props.onPageChange();
  };

  const onquizQuestionChange = (event) => {
    setQuizQuestion(event.target.value);
  };
  const onquizQuestion1Change = (event) => {
    setQuizOption1(event.target.value);
  };
  const onquizQuestion2Change = (event) => {
    setQuizOption2(event.target.value);
  };
  const onquizQuestion3Change = (event) => {
    setQuizOption3(event.target.value);
  };
  const onquizQuestion4Change = (event) => {
    setQuizOption4(event.target.value);
  };
  const onCorrectOptionChange = (event) => {
    setCorrectOption(event.target.value);
  };

  const onSubmitClick = () => {
    fetch("http://localhost:5000/uploadQuestion", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: 1680799851124,
        question: quizQuestion,
        option1: quizOption1,
        option2: quizOption2,
        option3: quizOption3,
        option4: quizOption4,
        correctOption: correctOption,
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
  };

  return (
    <div>
      <h3>Add Questions</h3>
      <button onClick={handleClick}>Save</button>
      <form>
        <input
          type="text"
          placeholder="Enter Question"
          onChange={onquizQuestionChange}
        />
        <input
          type="text"
          placeholder="Question 1"
          onChange={onquizQuestion1Change}
        />
        <input
          type="text"
          placeholder="Question 2"
          onChange={onquizQuestion2Change}
        />
        <input
          type="text"
          placeholder="Question 3"
          onChange={onquizQuestion3Change}
        />
        <input
          type="text"
          placeholder="Question 4"
          onChange={onquizQuestion4Change}
        />
        <select onChange={onCorrectOptionChange}>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>
      </form>
      <button onClick={onSubmitClick}>Submit</button>
    </div>
  );
};

export default UploadQuestion;
