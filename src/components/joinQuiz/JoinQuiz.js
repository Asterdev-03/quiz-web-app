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

  /* validates the code and stores the student name to result report */
  const handleJoinClick = () => {
    fetch("http://localhost:5000/joinQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: studentName,
        code: quizCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        /* if quiz exist store info to session storage */
        if (data.student) {
          console.log(data.student);
          sessionStorage.setItem(
            "student_name",
            JSON.stringify(data.student.name)
          );
          sessionStorage.setItem(
            "student_quizCode",
            JSON.stringify(data.student.code)
          );
          sessionStorage.setItem(
            "student_selectedOptionsList",
            JSON.stringify([])
          );
          sessionStorage.setItem("student_trace", JSON.stringify(0));
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
