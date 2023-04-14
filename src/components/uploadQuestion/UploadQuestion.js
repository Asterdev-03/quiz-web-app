import React, { useState } from "react";

const UploadQuestion = (props) => {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleClick = () => {
    props.onPageChange();
  };

  const onquizQuestionChange = (event) => {
    setQuizQuestion(event.target.value);
  };
  const onquizOptionChange = (event) => {
    setQuizOptions((prev) => [...prev, event.target.value]);
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
        options: quizOptions,
        correctOption: parseInt(correctOption),
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
          onChange={onquizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 2"
          onChange={onquizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 3"
          onChange={onquizOptionChange}
        />
        <input
          type="text"
          placeholder="Question 4"
          onChange={onquizOptionChange}
        />
        <select onChange={onCorrectOptionChange}>
          <option value="0">a</option>
          <option value="1">b</option>
          <option value="2">c</option>
          <option value="3">d</option>
        </select>
      </form>
      <button onClick={onSubmitClick}>Submit</button>
    </div>
  );
};

export default UploadQuestion;
