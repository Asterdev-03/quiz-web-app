import React, { useState } from "react";

// import components
import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import QuizList from "../../components/quizList/QuizList";
import UploadQuestion from "../../components/uploadQuestion/UploadQuestion";

const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState("quizList");

  const handlePageChangeToCreateQuiz = () => {
    setCurrentComponent("createQuiz");
  };

  const handlePageChangeToQuizList = () => {
    setCurrentComponent("quizList");
  };

  const handlePageChangeToUploadQuestion = () => {
    setCurrentComponent("uploadQuestion");
  };

  /* Set page component to be displayed in dashboard page */
  let pageComponent;
  if (currentComponent === "quizList") {
    pageComponent = <QuizList onPageChange={handlePageChangeToCreateQuiz} />;
  } else if (currentComponent === "createQuiz") {
    pageComponent = (
      <CreateQuiz onPageChange={handlePageChangeToUploadQuestion} />
    );
  } else if (currentComponent === "uploadQuestion") {
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
