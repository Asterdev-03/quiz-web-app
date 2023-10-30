import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import QuizCard from "../../../components/quizCard/QuizCard";

const QuizList = () => {
  const [quizlist, setQuizList] = useState([]);

  const navigate = useNavigate();

  const handleCreateQuizClick = () => {
    navigate("/dashboard/createquiz", { replace: true });
  };

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  /* fetches the qid list whose quiz cards are displayed */
  useEffect(() => {
    fetch("https://juiz-server.onrender.com/getQuizList", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: JSON.parse(sessionStorage.getItem("lecturerInfo_email")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizList(data.qidList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-700 p-5 min-h-screen">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      <button
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleCreateQuizClick}
      >
        Create Quiz
      </button>
      {/* display quiz card for each qid */}
      <div class="grid grid-cols-4 gap-1">
        {quizlist.map((qid) => (
          <QuizCard key={qid} qid={qid} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;
