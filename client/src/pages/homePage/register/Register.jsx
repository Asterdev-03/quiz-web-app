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
      fetch("https://quiz-web-app-api.vercel.app//register", {
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
    <div class="register">
      {/* <h2>Register</h2>
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
       */}
      <div class="wrapper">
        <div class="form-box login">
          <div>
            <h2>Sign-up</h2>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="mail-sharp"></ion-icon>
              </span>
              <input type="E-mail" onChange={onEmailChange} required />
              <label>E-mail</label>
            </div>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="person-circle-sharp"></ion-icon>
              </span>
              <input type="username" onChange={onNameChange} required />
              <label>Username</label>
            </div>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" onChange={onPasswordChange} required />
              <label>Password</label>
            </div>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                onChange={onConfirmPasswordChange}
                required
              />
              <label>Confirm password</label>
            </div>
            <button
              type="submit"
              onClick={handleSubmitClick}
              class="login-register-btn"
            >
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
