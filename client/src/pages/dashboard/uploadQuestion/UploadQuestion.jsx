import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadQuestion = () => {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("0");
  const [btnColors, setBtnColors] = useState({
    0: "#6b7280",
    1: "#6b7280",
    2: "#6b7280",
    3: "#6b7280",
  });

  const navigate = useNavigate();

  const handleSaveClick = () => {
    navigate("/dashboard", { replace: true });
  };

  const onQuizQuestionChange = (event) => {
    setQuizQuestion(event.target.value);
  };

  const onQuizOptionChange = (index, event) => {
    const newQuizOptions = [...quizOptions];
    newQuizOptions[index] = event.target.value;
    setQuizOptions(newQuizOptions);
  };

  const onCorrectOptionChange = (btnId) => {
    setCorrectOption(btnId);
    setBtnColors((prevColor) => {
      const updateColor = {};
      for (const id in prevColor) {
        updateColor[id] = id === btnId ? "green" : "#6b7280";
      }
      return updateColor;
    });
  };

  /* uploads the question and options to quiz with qid key */
  const onSubmitClick = () => {
    fetch("http://localhost:5000/uploadQuestion", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qid: JSON.parse(sessionStorage.getItem("lecturerInfo_Qid_Update")),
        question: quizQuestion,
        options: quizOptions,
        correctOption: parseInt(correctOption),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.quiz) {
          console.log(data.quiz);
          setCorrectOption("0");
          setQuizOptions([]);
          setQuizQuestion("");
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form class="bg-gray-800 p-3 m-0 min-h-screen">
      <button
        type="button"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleSaveClick}
      >
        Save
      </button>

      <div class="mb-6 ">
        <label
          for="large-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Question
        </label>
        <input
          type="text"
          id="large-input"
          class="block w-full p-7 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onQuizQuestionChange}
          required
        />
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 1
          </label>
          <button
            type="button"
            id="0"
            style={{ backgroundColor: btnColors["0"] }}
            onClick={() => onCorrectOptionChange("0")}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-1 py-5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus: outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <input
              type="text"
              id="first_name"
              class="bg-transparent text-gray-900 text-lg rounded-lg  block w-full p-1  dark:placeholder-gray-400 dark:text-white  "
              placeholder=""
              onChange={(event) => {
                onQuizOptionChange(0, event);
              }}
              required
            />
          </button>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 2
          </label>
          <button
            type="button"
            id="1"
            style={{ backgroundColor: btnColors["1"] }}
            onClick={() => onCorrectOptionChange("1")}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-1 py-5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus: outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <input
              type="text"
              id="first_name"
              class="bg-transparent text-gray-900 text-lg rounded-lg focus:ring-blue-500 block w-full p-1  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              placeholder=""
              onChange={(event) => {
                onQuizOptionChange(1, event);
              }}
              required
            />
          </button>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 3
          </label>
          <button
            type="button"
            id="2"
            style={{ backgroundColor: btnColors["2"] }}
            onClick={() => onCorrectOptionChange("2")}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-1 py-5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus: outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <input
              type="text"
              id="first_name"
              class="bg-transparent text-gray-900 text-lg rounded-lg focus:ring-blue-500 block w-full p-1  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              placeholder=""
              onChange={(event) => {
                onQuizOptionChange(2, event);
              }}
            />
          </button>
        </div>
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 4
          </label>
          <button
            type="button"
            id="3"
            style={{ backgroundColor: btnColors["3"] }}
            onClick={() => onCorrectOptionChange("3")}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-1 py-5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus: outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <input
              type="text"
              id="first_name"
              class="bg-transparent text-gray-900 text-lg rounded-lg focus:ring-blue-500 block w-full p-1  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              placeholder=""
              onChange={(event) => {
                onQuizOptionChange(3, event);
              }}
            />
          </button>
        </div>
      </div>
      <button
        type="submit"
        class=" text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={onSubmitClick}
      >
        Submit
      </button>
    </form>
  );
};

export default UploadQuestion;
