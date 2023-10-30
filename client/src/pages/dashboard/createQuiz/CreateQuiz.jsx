import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [quizCourseName, setQuizCourseName] = useState("");
  const [quizTimer, setQuizTimer] = useState("");
  const [quizPoolSize, setQuizPoolSize] = useState("");

  const navigate = useNavigate();

  const onQuizCourseNameChange = (event) => {
    setQuizCourseName(event.target.value);
  };
  const onQuizTimerChange = (event) => {
    setQuizTimer(event.target.value);
  };
  const onQuizPoolSizeChange = (event) => {
    setQuizPoolSize(event.target.value);
  };

  /* adds qid to lecturer qid list and set the courseName*/
  const handleSubmitClick = async () => {
    sessionStorage.setItem(
      "lecturerInfo_Qid_Update",
      JSON.stringify(Date.now())
    );
    await fetch("https://quiz-web-app-api.vercel.app/createQuiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: JSON.parse(sessionStorage.getItem("lecturerInfo_email")),
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        courseName: quizCourseName,
        timer: parseInt(quizTimer),
        poolSize: parseInt(quizPoolSize),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log(data.quiz);
          navigate("/dashboard/updatequiz", { replace: true });
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen min-h-screen bg-gray-500 grid grid-cols-1 justify-items-center items-center">
      <div class="w-full max-w-sm m-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Enter Quiz Details
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quiz Name
            </label>
            <input
              type="text"
              placeholder="Enter Quiz Name"
              onChange={onQuizCourseNameChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Time Limit (in sec)
            </label>
            <input
              name="password"
              id="password"
              type="number"
              onChange={onQuizTimerChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Question Pool Size
            </label>
            <input
              name="password"
              id="password"
              type="number"
              onChange={onQuizPoolSizeChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            onClick={handleSubmitClick}
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
