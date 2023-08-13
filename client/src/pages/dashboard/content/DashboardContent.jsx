import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import components
import QuizList from "../quizList/QuizList";
import CreateQuiz from "../createQuiz/CreateQuiz";
import ResultDataPage from "../resultDataPage/ResultDataPage";
import UploadQuestion from "../uploadQuestion/UploadQuestion";

const DashboardContent = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizList />}></Route>
      <Route path="/createquiz" element={<CreateQuiz />}></Route>
      <Route path="/updatequiz" element={<UploadQuestion />}></Route>
      <Route path="/resultreport" element={<ResultDataPage />}></Route>
    </Routes>
  );
};

export default DashboardContent;
