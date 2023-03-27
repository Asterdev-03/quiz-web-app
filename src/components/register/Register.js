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
    }).then((res) => res.json());
  };

  return (
    <div>
      <input type="text" name="name" onChange={onNameChange} />
      <input type="text" name="name" onChange={onPasswordChange} />
      <button onClick={onSumbitClick}>Register</button>
    </div>
  );
};

export default Register;
