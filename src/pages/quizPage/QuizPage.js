import { useState } from "react";
import QuizAttempt from "../../components/quizAttempt/QuizAttempt";
import StudentResult from "../../components/studentResult/StudentResult";

const QuizPage = () => {
  const [currentPage, setCurrentPage] = useState("quiz");

  const handlePageChange = () => {
    setCurrentPage("student-result");
  };

  let pageComponent;
  if (currentPage === "quiz") {
    pageComponent = <QuizAttempt onPageChange={handlePageChange} />;
  } else {
    pageComponent = <StudentResult />;
  }

  return (
    <div>
      <h2>Quiz Page</h2>
      {pageComponent}
    </div>
  );
};

export default QuizPage;
