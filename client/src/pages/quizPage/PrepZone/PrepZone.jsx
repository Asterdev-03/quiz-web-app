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
      fetch("https://juiz-server.onrender.com/getQuizStatus", {
        method: "post",
        
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

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  const storeStudentInfo = () => {
    fetch("https://juiz-server.onrender.com/putStudentInfo", {
      method: "post",
      
      body: JSON.stringify({
        name: JSON.parse(sessionStorage.getItem("student_name")),
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.timer) {
          console.log("Timer", data.timer);
          sessionStorage.setItem(
            "student_currentTimerValue",
            JSON.stringify(data.timer)
          );
          sessionStorage.setItem(
            "student_timerValue",
            JSON.stringify(data.timer)
          );
          sessionStorage.setItem("student_trace", JSON.stringify(0));
          sessionStorage.setItem("student_quizInfo", JSON.stringify("none"));
          sessionStorage.setItem(
            "student_selectedOptionsList",
            JSON.stringify([])
          );
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
    <div className="p-8 bg-gray-700 ">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      {quizStarted ? (
        <div className="h-screen">
          <h2 className="text-4xl text-indigo-50 mb-5">Rules</h2>
          <ul class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Timely Participation: The quiz will be available for a specific
                duration, and students must complete it within the given time
                frame. Late submissions will not be considered.
              </span>
            </li>
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Individual Effort: Each student must attempt the quiz
                individually. Collaboration or seeking help from others during
                the quiz is strictly prohibited.
              </span>
            </li>
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                No Cheating: Any form of cheating, including using external
                resources, search engines, or communicating with others during
                the quiz, is strictly forbidden. Violation of this rule may
                result in disqualification.
              </span>
            </li>
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Internet Connectivity: Participants are responsible for ensuring
                a stable internet connection throughout the quiz to avoid any
                disruptions or technical difficulties. The app or platform
                should provide adequate support to address any connectivity
                issues that may arise.
              </span>
            </li>
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Time Limit: The quiz should have a predefined time limit,
                clearly communicated to the students. They should be aware of
                how much time they have to answer each question and complete the
                entire quiz.
              </span>
            </li>
          </ul>
          <button
            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleReadyClick}
          >
            {readyStatus ? "Not Ready" : "Ready"}
          </button>
        </div>
      ) : (
        <div className="h-screen grid grid-cols-1 justify-items-center items-center ">
          <h2 className="text-7xl text-indigo-50 mb-5">
            The Quiz has already started
          </h2>
        </div>
      )}
    </div>
  );
};

export default PrepZone;
