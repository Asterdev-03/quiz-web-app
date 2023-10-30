import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = (props) => {
  const [quiz, setQuiz] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);

  const navigate = useNavigate();

  const handleUpdateClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    navigate("/dashboard/updatequiz", { replace: true });
  };

  /* set whether to show or hide the quiz info */
  const handleViewClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    setShowQuestions(!showQuestions);
  };

  const handleDeleteClick = async () => {
    await fetch("https://juiz-server.onrender.com/removeQuizInfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: props.qid,
        email: JSON.parse(sessionStorage.getItem("lecturerInfo_email")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log("Quiz DELETED", data.quiz);
          setQuiz(data.quiz);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  /* generate code for current quiz and stores it in session storage */
  const handleStartQuizClick = () => {
    sessionStorage.setItem("lecturerInfo_Qid_Update", JSON.stringify(quiz.qid));
    sessionStorage.setItem(
      "lecturerInfo_QuizCode",
      JSON.stringify(Date.now() % 1000000)
    );
    sessionStorage.setItem("lecturerInfo_status", JSON.stringify(false));
    navigate("/dashboard/resultreport", { replace: true });
  };

  /* fetches quiz info for the quiz card */
  useEffect(() => {
    fetch("https://juiz-server.onrender.com/getQuizInfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: props.qid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log("Quiz", data.quiz);
          setQuiz(data.quiz);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.qid]);

  return (
    <div>
      {quiz && quiz.courseName && (
        <div class="max-w-sm mx-3 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img class="rounded-t-lg" src="/bg4.jpg" alt="" />
          <div className="p-2">
            <div class="flex flex-col items-center pb-3">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {quiz.courseName}
              </h5>
              <div class="flex mt-4 space-x-3 md:mt-6">
                <button
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleStartQuizClick}
                >
                  Start Quiz
                </button>
                <button
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  onClick={handleViewClick}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showQuestions && (
        <div
          id="popup-modal"
          tabindex="-1"
          class="fixed top-0 left-0 right-0 z-50 p-1 overflow-x-hidden overflow-y-auto  max-h-full"
        >
          <div class="relative w-full max-w-full max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div>
                <button
                  type="button"
                  class="absolute top-3 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={handleViewClick}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="absolute top-3 right-11 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={handleUpdateClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  <span class="sr-only">Edit modal</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="absolute top-3 right-20 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={handleDeleteClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <span class="sr-only">Delete modal</span>
                </button>
              </div>

              <div class="p-6 text-center">
                <div class="relative overflow-x-auto">
                  <h3 class="text-3xl text-gray-900 whitespace-nowrap dark:text-white">
                    QUIZ INFO
                  </h3>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="text-sm px-3 py-2">
                          Question
                        </th>
                        <th scope="col" class="text-sm px-3 py-2">
                          Options
                        </th>
                        <th scope="col" class="text-sm px-3 py-2">
                          correct Option
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quiz.quizInfo.map((qInfo) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {qInfo.question}
                          </th>
                          <td class="px-6 py-4">
                            {qInfo.options.map((option) => (
                              <tr>{option}</tr>
                            ))}
                            <br />
                          </td>
                          <td class="px-6 py-4">
                            {qInfo.options[qInfo.correctOption]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
