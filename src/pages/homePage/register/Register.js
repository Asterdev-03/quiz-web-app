import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  };
  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };
  const onConfirmPasswordChange = (event) => {
    setRegisterConfirmPassword(event.target.value);
  };

  /* register with email and password */
  const handleSubmitClick = () => {
    if (registerConfirmPassword === registerPassword) {
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
          if (data.lecturer) {
            /* if lecturer is created store info to session storage */
            sessionStorage.setItem(
              "lecturerInfo_name",
              JSON.stringify(data.lecturer.name)
            );
            sessionStorage.setItem(
              "lecturerInfo_email",
              JSON.stringify(data.lecturer.email)
            );
            navigate("/dashboard", { replace: true });
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Password not same as in confirm password");
    }
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
        <input
          type="text"
          placeholder="Confirm password"
          onChange={onConfirmPasswordChange}
        />
        <br />
      </form>
      <button onClick={handleSubmitClick}>Register</button>
    </div>
  );
};

export default Register;
