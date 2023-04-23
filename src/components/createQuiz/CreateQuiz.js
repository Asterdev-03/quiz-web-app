import React, { useState } from "react";

const CreateQuiz = (props) => {
  const [quizCourseName, setQuizCourseName] = useState("");

  const onQuizCourseNameChange = (event) => {
    setQuizCourseName(event.target.value);
  };

  /* adds qid to lecturer qid list and set the courseName*/
  const handleSubmitClick = async () => {
    sessionStorage.setItem(
      "lecturerInfo_Qid_Update",
      JSON.stringify(Date.now())
    );
    await fetch("http://localhost:5000/createQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: JSON.parse(sessionStorage.getItem("lecturerInfo_email")),
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        courseName: quizCourseName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log(data.quiz);
          props.onPageChange();
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
      <input
        type="text"
        placeholder="Enter Course Name"
        onChange={onQuizCourseNameChange}
      />
      <br />
      <button onClick={handleSubmitClick}>Submit</button>
    </div>
  );
};

export default CreateQuiz;
