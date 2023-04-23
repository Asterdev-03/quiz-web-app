import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import QuizCard from "../quizCard/QuizCard";

const QuizList = (props) => {
  const [quizlist, setQuizList] = useState([]);

  const navigate = useNavigate();

  const handleCreateQuizClick = () => {
    props.onPageChange();
  };

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  /* fetches the qid list whose quiz cards are displayed */
  useEffect(() => {
    fetch("http://localhost:5000/getQuizList", {
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
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      {/* display quiz card for each qid */}
      <div>
        {quizlist.map((qid) => (
          <QuizCard key={qid} qid={qid} />
        ))}
      </div>
      <button onClick={handleCreateQuizClick}>Create Quiz</button>
    </div>
  );
};

export default QuizList;
