import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// import components
import Login from "../login/Login";
import Register from "../register/Register";
import JoinQuiz from "../joinQuiz/JoinQuiz";
import Error404 from "../../../components/error404/Error404";

const HomeContent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Error404 />}></Route>
      <Route path="/" element={<JoinQuiz />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default HomeContent;
