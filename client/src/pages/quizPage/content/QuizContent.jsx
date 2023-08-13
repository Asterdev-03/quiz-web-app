import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import components
import PrepZone from "../PrepZone/PrepZone";
import Quiz from "../Quiz/Quiz";
import StudentResult from "../Result/StudentResult";

const QuizContent = () => {
  return (
    <Routes>
      <Route path="/" element={<PrepZone />}></Route>
      <Route path="/arena" element={<Quiz />}></Route>
      <Route path="/result" element={<StudentResult />}></Route>
    </Routes>
  );
};

export default QuizContent;
