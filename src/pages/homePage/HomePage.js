import React, { useState } from "react";

// import components
import Login from "../../components/login/Login.js";
import Register from "../../components/register/Register.js";
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("joinQuiz");

  const handleRegisterClick = () => {
    setCurrentPage("register");
  };

  const handleLoginClick = () => {
    setCurrentPage("login");
  };
  const handlejoinQuizClick = () => {
    setCurrentPage("joinQuiz");
  };

  let pageComponent;
  if (currentPage === "register") {
    pageComponent = <Register />;
  } else if (currentPage === "login") {
    pageComponent = <Login />;
  } else if (currentPage === "joinQuiz") {
    pageComponent = <JoinQuiz />;
  }

  return (
    <div>
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handlejoinQuizClick}>JoinQuiz</button>
      {pageComponent}
    </div>
  );
};

export default HomePage;
