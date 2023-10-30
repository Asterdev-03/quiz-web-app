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
    fetch("https://quiz-web-app-api.vercel.app/joinQuiz", {
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
    <div class="joinquiz">
      <div class="wrapper">
        <div class="form-box login">
          <div>
            <h2>Join Quiz</h2>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="name" onChange={onNameChange} required />
              <label>Name</label>
            </div>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="quizcode" onChange={onCodeChange} required />
              <label>Quiz Code</label>
            </div>

            <button onClick={handleJoinClick} class="login-register-btn">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
