import React, { useState } from "react";

// import components
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import QuizList from "../../components/quizList/QuizList";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("quizList");

  const handlePageChangeToCreateQuiz = () => {
    setCurrentPage("createQuiz");
  };

  const handlePageChangeToQuizList = () => {
    setCurrentPage("quizList");
  };

  let pageComponent;
  if (currentPage === "quizList") {
    pageComponent = <QuizList onPageChange={handlePageChangeToCreateQuiz} />;
  } else if (currentPage === "createQuiz") {
    pageComponent = <CreateQuiz onPageChange={handlePageChangeToQuizList} />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {pageComponent}
    </div>
  );
};

export default Dashboard;
