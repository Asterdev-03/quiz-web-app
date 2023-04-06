import React, { useState } from "react";

const CreateQuiz = (props) => {
  const [courseName, setCourseName] = useState("");

  const onCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const onSubmitClick = () => {
    fetch("http://localhost:5000/createQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "ak@gmail.com",
        qid: Date.now(),
        courseName: courseName,
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
    props.onPageChange();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Course Name"
        onChange={onCourseNameChange}
      />
      <br />
      <button onClick={onSubmitClick}>Submit</button>
    </div>
  );
};

export default CreateQuiz;
