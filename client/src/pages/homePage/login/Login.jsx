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
    console.log("hi");
    fetch("https://juiz-server.onrender.com/login", {
      method: "post",
      
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.lecturer) {
          console.log("hi");
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
    <div class="login">
      <div class="wrapper ">
        <div class="form-box login">
          <div>
            <h2>Login</h2>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="person-circle"></ion-icon>
              </span>
              <input type="email" onChange={onEmailChange} />
              <label>Email</label>
            </div>
            <div class="input-box">
              <span class="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" onChange={onPasswordChange} />
              <label>Password</label>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="/home/login">Forgot password?</a>
            </div>
            <button class="login-register-btn" onClick={handleSubmitClick}>
              Login
            </button>
            <div class="login-register">
              <p>
                Don't have an account?
                <button class="register-acc" onClick={handleRegisterClick}>
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
