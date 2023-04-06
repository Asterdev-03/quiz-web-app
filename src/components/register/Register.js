import React, { useState } from "react";

const Register = () => {
  const [registerName, setName] = useState("");
  const [registerPassword, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSumbitClick = () => {
    fetch("http://localhost:5000/getRegister", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        password: registerPassword,
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
      <h2>Register</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          onChange={onNameChange}
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter password"
          onChange={onPasswordChange}
        />
        <br />
        <button onClick={onSumbitClick}>Register</button>
      </div>
    </div>
  );
};

export default Register;
