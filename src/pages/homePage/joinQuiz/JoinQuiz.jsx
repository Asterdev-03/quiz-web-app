import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinQuiz = () => {
  const [quizCode, setQuizCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();

  const onNameChange = (event) => {
    setStudentName(event.target.value);
  };
  const onCodeChange = (event) => {
    setQuizCode(event.target.value);
  };
  const handleLoginClick = (event) => {
    navigate("/home/login");
  };

  /* validates the code and stores the student name to result report */
  const handleJoinClick = () => {
    fetch("http://localhost:5000/joinQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: quizCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        /* if quiz exist store info to session storage */
        if (data.status) {
          sessionStorage.setItem("student_name", JSON.stringify(studentName));
          sessionStorage.setItem("student_quizCode", JSON.stringify(quizCode));
          sessionStorage.setItem("student_ready_status", JSON.stringify(false));
          navigate("/quiz", { replace: true });
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
      <button onClick={handleLoginClick}>login</button>
      <h2>Join a Quiz</h2>
      <form>
        <input type="text" placeholder="Enter name" onChange={onNameChange} />
        <br />
        <input type="text" placeholder="Enter Code" onChange={onCodeChange} />
        <br />
      </form>
      <button onClick={handleJoinClick}>Join</button>
    </div>
  );
};

export default JoinQuiz;
