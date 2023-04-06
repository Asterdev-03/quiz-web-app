import React, { useState } from "react";

const Login = () => {
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

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
      <div>
        <input type="text" placeholder="Enter email" onChange={onEmailChange} />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
        <button onClick={onSubmitClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
