import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import pages
import Dashboard from "../../pages/dashboard/Dashboard";
import HomePage from "../../pages/homePage/HomePage";
import QuizPage from "../../pages/quizPage/QuizPage";
import ResultDataPage from "../../pages/resultDataPage/ResultDataPage";
import StudentResultPage from "../../pages/studentResultPage/StudentResultPage";

import CreateQuiz from "../../components/createQuiz/CreateQuiz";
import QuizList from "../../components/quizList/QuizList";
import UploadQuestion from "../../components/uploadQuestion/UploadQuestion";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="" element={<QuizList />} />
        <Route path="createQuiz" element={<CreateQuiz />} />
        <Route path="uploadQuestions" element={<UploadQuestion />} />
      </Route>
      <Route path="/resultData" element={<ResultDataPage />}></Route>
      <Route path="/quiz" element={<QuizPage />}></Route>
      <Route path="/studentResult" element={<StudentResultPage />}></Route>
    </Routes>
  );
};

export default Content;
