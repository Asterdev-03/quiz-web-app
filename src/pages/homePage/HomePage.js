import React, { useState } from "react";

// import components
import Login from "../../components/login/Login.js";
import Register from "../../components/register/Register.js";
import JoinQuiz from "../../components/joinQuiz/JoinQuiz";

const HomePage = () => {
  const [currentPageComponent, setCurrentPageComponent] = useState("joinQuiz");

  const handleRegisterClick = () => {
    setCurrentPageComponent("register");
  };

  const handleLoginClick = () => {
    setCurrentPageComponent("login");
  };
  const handlejoinQuizClick = () => {
    setCurrentPageComponent("joinQuiz");
  };

  /* Set page component to be displayed in home page */
  let pageComponent;
  if (currentPageComponent === "register") {
    pageComponent = <Register />;
  } else if (currentPageComponent === "login") {
    pageComponent = <Login />;
  } else if (currentPageComponent === "joinQuiz") {
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
