import React, { useState } from "react";

const CreateQuiz = (props) => {
  const [qstn, setQstn] = useState("");
  const [qstn1, setQstn1] = useState("");
  const [qstn2, setQstn2] = useState("");
  const [qstn3, setQstn3] = useState("");
  const [qstn4, setQstn4] = useState("");
  const [optn, setOptn] = useState("");

  const handleClick = () => {
    props.onPageChange();
  };

  const onQstnChange = (event) => {
    setQstn(event.target.value);
  };

  const onQstn1Change = (event) => {
    setQstn1(event.target.value);
  };
  const onQstn2Change = (event) => {
    setQstn2(event.target.value);
  };
  const onQstn3Change = (event) => {
    setQstn3(event.target.value);
  };
  const onQstn4Change = (event) => {
    setQstn4(event.target.value);
  };
  const onOptnChange = (event) => {
    setOptn(event.target.value);
  };

  const onSumbitClick = () => {
    fetch("http://localhost:5000/getQstnUpload", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 5,
        quesstion: qstn,
        quesstion1: qstn1,
        quesstion2: qstn2,
        quesstion3: qstn3,
        quesstion4: qstn4,
        option: optn,
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
      <h3>Add Questions</h3>
      <button onClick={handleClick}>Back</button>
      <form>
        <input
          type="text"
          placeholder="Enter Question"
          onChange={onQstnChange}
        />
        <input type="text" placeholder="Question 1" onChange={onQstn1Change} />
        <input type="text" placeholder="Question 2" onChange={onQstn2Change} />
        <input type="text" placeholder="Question 3" onChange={onQstn3Change} />
        <input type="text" placeholder="Question 4" onChange={onQstn4Change} />
        <select id="lang" placeholder="hhhh">
          <option onChange={onOptnChange}>a</option>
          <option onChange={onOptnChange}>b</option>
          <option onChange={onOptnChange}>c</option>
          <option onChange={onOptnChange}>d</option>
        </select>
        <button onClick={onSumbitClick}>Sumbit</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
