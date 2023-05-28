import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import pages
import Dashboard from "../pages/dashboard/Dashboard";
import Error404 from "../components/error404/Error404";
import HomePage from "../pages/homePage/HomePage";
import QuizPage from "../pages/quizPage/QuizPage";

const RoutesDef = () => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="/*" element={<Error404 />}></Route>
      <Route index path="/home/*" element={<HomePage />}></Route>
      <Route path="/dashboard/*" element={<Dashboard />}></Route>
      <Route path="/quiz/*" element={<QuizPage />}></Route>
    </Routes>
  );
};

export default RoutesDef;
