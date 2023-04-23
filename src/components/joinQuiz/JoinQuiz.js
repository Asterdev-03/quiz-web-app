import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinQuiz = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const onJoinClick = () => {
    fetch("http://localhost:5000/joinQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log(data.user);
          sessionStorage.setItem("student_name", JSON.stringify(name));
          sessionStorage.setItem("student_code", JSON.stringify(code));
          sessionStorage.setItem(
            "student_selectedOptionsList",
            JSON.stringify([])
          );
          sessionStorage.setItem("student_trace", JSON.stringify(0));
          navigate("/quiz");
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
      <button onClick={onJoinClick}>Join</button>
    </div>
  );
};

export default JoinQuiz;
