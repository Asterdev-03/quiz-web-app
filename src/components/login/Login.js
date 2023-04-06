import React, { useState } from "react";

const Login = () => {
  const [loginName, setName] = useState("");
  const [loginPassword, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSumbitClick = () => {
    fetch("http://localhost:5000/getLogin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: loginName,
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
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          onChange={onNameChange}
        />
        <br />
        <input
          type="password"
          name="name"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
        <button onClick={onSumbitClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
