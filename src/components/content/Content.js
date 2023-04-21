import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import pages
import Dashboard from "../../pages/dashboard/Dashboard";
import HomePage from "../../pages/homePage/HomePage";
import QuizPage from "../../pages/quizPage/QuizPage";
import ResultPage from "../../pages/resultPage/ResultPage";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/result" element={<ResultPage />}></Route>
      <Route path="/quiz" element={<QuizPage />}></Route>
    </Routes>
  );
};

export default Content;
