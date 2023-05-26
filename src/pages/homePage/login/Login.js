import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegisterClick = (event) => {
    navigate("/home/register");
  };

  /* validates email and password for login */
  const handleSubmitClick = () => {
    fetch("http://localhost:5000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.lecturer) {
          /* if lecturer exist store info to session storage */
          sessionStorage.setItem(
            "lecturerInfo_name",
            JSON.stringify(data.lecturer.name)
          );
          sessionStorage.setItem(
            "lecturerInfo_email",
            JSON.stringify(data.lecturer.email)
          );
          navigate("/dashboard");
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Enter email" onChange={onEmailChange} />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
      </form>
      <button onClick={handleSubmitClick}>Login</button>
      <button onClick={handleRegisterClick}>Create a new account</button>
    </div>
  );
};

export default Login;
