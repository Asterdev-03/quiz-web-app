import React, { useState } from "react";

const CreateQuiz = (props) => {
  const [courseName, setCourseName] = useState("");

  const onCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const onSubmitClick = async () => {
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
        courseName: courseName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log(data.user);
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
        onChange={onCourseNameChange}
      />
      <br />
      <button onClick={onSubmitClick}>Submit</button>
    </div>
  );
};

export default CreateQuiz;
