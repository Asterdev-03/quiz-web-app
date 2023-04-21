import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerName, setName] = useState("");
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");

  const navigate = useNavigate();

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
          sessionStorage.setItem(
            "lecturerInfo_name",
            JSON.stringify(data.user.name)
          );
          sessionStorage.setItem(
            "lecturerInfo_email",
            JSON.stringify(data.user.email)
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
