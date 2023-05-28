import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrepZone = () => {
  const [quizStarted, setQuizStarted] = useState(true);
  const [readyStatus, setReadyStatus] = useState(
    JSON.parse(sessionStorage.getItem("student_ready_status"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/getQuizStatus", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Quiz", data.status);
          if (data.status) {
            if (data.status === true) {
              if (
                JSON.parse(sessionStorage.getItem("student_ready_status")) ===
                true
              ) {
                storeStudentInfo();
                sessionStorage.setItem(
                  "student_selectedOptionsList",
                  JSON.stringify([])
                );
                sessionStorage.setItem("student_trace", JSON.stringify(0));
                navigate("/quiz/arena");
              } else {
                setQuizStarted(false);
              }
            }
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const storeStudentInfo = () => {
    fetch("http://localhost:5000/putStudentInfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: JSON.parse(sessionStorage.getItem("student_name")),
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.student) {
          console.log("Student", data.student);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReadyClick = () => {
    const status = JSON.parse(sessionStorage.getItem("student_ready_status"));
    sessionStorage.setItem("student_ready_status", JSON.stringify(!status));
    setReadyStatus(JSON.parse(sessionStorage.getItem("student_ready_status")));
  };

  return (
    <div>
      {quizStarted ? (
        <div>
          <h2>Rules</h2>
          <ol>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est
              error, possimus, qui, modi assumenda animi obcaecati ipsam maxime
              aut nihil iste perferendis odio quis deserunt! Dignissimos
              architecto corrupti eveniet.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est
              error, possimus, qui, modi assumenda animi obcaecati ipsam maxime
              aut nihil iste perferendis odio quis deserunt! Dignissimos
              architecto corrupti eveniet.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est
              error, possimus, qui, modi assumenda animi obcaecati ipsam maxime
              aut nihil iste perferendis odio quis deserunt! Dignissimos
              architecto corrupti eveniet.
            </li>
          </ol>
          <button onClick={handleReadyClick}>{readyStatus + ""}</button>
        </div>
      ) : (
        <div>
          <h2>The Quiz has already started</h2>
        </div>
      )}
    </div>
  );
};

export default PrepZone;
