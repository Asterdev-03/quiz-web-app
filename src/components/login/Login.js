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
      <input type="text" name="name" onChange={onNameChange} />
      <input type="password" name="name" onChange={onPasswordChange} />
      <button onClick={onSumbitClick}>Login</button>
    </div>
  );
};

export default Login;
