import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLecturerInfo } from "../../hooks/fetchLecturerDashboardDetails";

const Login = () => {
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

  const [, updateLecturerEmail] = useLecturerInfo();

  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitClick = () => {
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
        if (data.user) {
          console.log(data.user);
          updateLecturerEmail(loginEmail);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Enter email"
          autoComplete="current-password"
          onChange={onEmailChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
      </form>
      <button onClick={onSubmitClick}>Login</button>
    </div>
  );
};

export default Login;
