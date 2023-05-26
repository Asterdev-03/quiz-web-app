import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrepZone = () => {
  const [readyStatus, setReadyStatus] = useState(false);
  const [showReady, setShowReady] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (showReady) {
      fetch("http://localhost:5000/getQuizStatus", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.quiz) {
            console.log("Quiz", data.quiz);
            if (data.quiz.status === true && readyStatus === false) {
              setShowReady(false);
            } else if (data.quiz.status === true && readyStatus === true) {
              navigate("/quiz/arena");
            }
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const handleReadyClick = () => {
    setReadyStatus(!readyStatus);
  };
  return (
    <div>
      {showReady ? (
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
          <button onClick={handleReadyClick}>Ready</button>
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
