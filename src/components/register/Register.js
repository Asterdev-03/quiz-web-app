import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLecturerInfo } from "../../hooks/fetchLecturerDashboardDetails";

const Register = () => {
  const [registerName, setName] = useState("");
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const [, updateLecturerEmail] = useLecturerInfo();

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitClick = () => {
    fetch("http://localhost:5000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log(data.user);
          updateLecturerEmail(registerEmail);
          navigate("/dashboard", { replace: true });
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
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Enter name" onChange={onNameChange} />
        <br />
        <input type="text" placeholder="Enter email" onChange={onEmailChange} />
        <br />
        <input
          type="text"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
        <input type="text" placeholder="Confirm password" />
        <br />
      </form>
      <button onClick={onSubmitClick}>Register</button>
    </div>
  );
};

export default Register;
