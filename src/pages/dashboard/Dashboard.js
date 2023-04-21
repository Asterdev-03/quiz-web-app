import React, { useState } from "react";

// import components
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import QuizList from "../../components/quizList/QuizList";
import UploadQuestion from "../../components/uploadQuestion/UploadQuestion";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("quizList");

  const handlePageChangeToCreateQuiz = () => {
    setCurrentPage("createQuiz");
  };

  const handlePageChangeToQuizList = () => {
    setCurrentPage("quizList");
  };

  const handlePageChangeToUploadQuestion = () => {
    setCurrentPage("uploadQuestion");
  };

  let pageComponent;
  if (currentPage === "quizList") {
    pageComponent = <QuizList onPageChange={handlePageChangeToCreateQuiz} />;
  } else if (currentPage === "createQuiz") {
    pageComponent = (
      <CreateQuiz onPageChange={handlePageChangeToUploadQuestion} />
    );
  } else if (currentPage === "uploadQuestion") {
    pageComponent = (
      <UploadQuestion onPageChange={handlePageChangeToQuizList} />
    );
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {pageComponent}
    </div>
  );
};

export default Dashboard;
