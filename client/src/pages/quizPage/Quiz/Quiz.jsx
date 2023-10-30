import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizInfo, setQuizInfo] = useState(
    JSON.parse(sessionStorage.getItem("student_quizInfo"))
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [trace, setTrace] = useState(
    JSON.parse(sessionStorage.getItem("student_trace"))
  );
  const [timerValue, setTimerValue] = useState(
    JSON.parse(sessionStorage.getItem("student_currentTimerValue"))
  );
  const [btnColors, setBtnColors] = useState({
    0: "#6b7280",
    1: "#6b7280",
    2: "#6b7280",
    3: "#6b7280",
  });

  const navigate = useNavigate();

  /* fetches quiz info to be diplayed using code key */
  useEffect(() => {
    if (quizInfo && quizInfo === "none") {
      console.log("fetch");
      fetch("http://localhost:5000/getQuizQuestions", {
        method: "post",
        
        body: JSON.stringify({
          code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.quiz) {
            console.log("Quiz", data.quiz);
            setQuizInfo(data.quiz);
            sessionStorage.setItem(
              "student_quizInfo",
              JSON.stringify(data.quiz)
            );
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [quizInfo]);

  useEffect(() => {
    if (quizInfo && quizInfo !== "none") {
      const countdown = setInterval(() => {
        setTimerValue((prevValue) => {
          const newValue = prevValue - 1;
          sessionStorage.setItem(
            "student_currentTimerValue",
            JSON.stringify(newValue)
          );
          if (newValue <= 0) {
            incrementTrace();
          }

          return newValue;
        });
      }, 1000);
      return () => {
        clearInterval(countdown);
      };
    }
  });

  /* fetches the result comparing selected options and correct options */
  const handleSubmitSelectedOptions = async () => {
    const optionsList = JSON.parse(
      sessionStorage.getItem("student_selectedOptionsList")
    );
    const quizresult = quizInfo;
    for (let i = 0; i < quizresult.length && i < optionsList.length; i++) {
      quizresult[i].selectedOption = optionsList[i];
    }
    console.log("Provided Answers", quizresult);
    await fetch("http://localhost:5000/setStudentResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        name: JSON.parse(sessionStorage.getItem("student_name")),
        quizresult: quizresult,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("StudentReport", data.result);
          navigate("/quiz/result", { replace: true });
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* stores the selected option list in session storage according to trace */
  const onSubmitClick = () => {
    const selectedOptionsList = JSON.parse(
      sessionStorage.getItem("student_selectedOptionsList")
    );
    selectedOptionsList.push(parseInt(selectedOption));
    sessionStorage.setItem(
      "student_selectedOptionsList",
      JSON.stringify(selectedOptionsList)
    );
    console.log(selectedOptionsList);

    incrementTrace();
  };

  const incrementTrace = () => {
    console.log("len", quizInfo.length);
    if (trace + 1 < quizInfo.length) {
      sessionStorage.setItem("student_trace", JSON.stringify(trace + 1));
      sessionStorage.setItem(
        "student_currentTimerValue",
        JSON.stringify(JSON.parse(sessionStorage.getItem("student_timerValue")))
      );
      setTimerValue(
        parseInt(
          JSON.parse(sessionStorage.getItem("student_currentTimerValue"))
        )
      );
      setSelectedOption("");
      setBtnColors((prevColor) => {
        const updateColor = {};
        for (const id in prevColor) {
          updateColor[id] = "#6b7280";
        }
        return updateColor;
      });
      setTrace(trace + 1);
    } else {
      handleSubmitSelectedOptions();
    }
  };

  const onCorrectOptionChange = (btnId) => {
    setSelectedOption(btnId);
    setBtnColors((prevColor) => {
      const updateColor = {};
      for (const id in prevColor) {
        updateColor[id] = id === btnId ? "green" : "#6b7280";
      }
      return updateColor;
    });
  };

  return (
    <div className="w-screen min-h-screen bg-gray-700 grid grid-cols-1 justify-items-center items-center">
      {quizInfo && quizInfo !== "none" && quizInfo[trace] && (
        <div class="relative  w-fit h-96 m-1 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-400 dark:border-gray-700">
          <div className="absolute top-5 right-0 grid grid-cols-2">
            <h3>Timer: {timerValue}</h3>
          </div>
          <div className="my-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">
              {quizInfo[trace].question ? quizInfo[trace].question : ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 my-12">
            <button
              id="0"
              style={{ backgroundColor: btnColors["0"] }}
              onClick={() => onCorrectOptionChange("0")}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {quizInfo[trace].options[0] ? quizInfo[trace].options[0] : ""}
            </button>
            <button
              id="1"
              style={{ backgroundColor: btnColors["1"] }}
              onClick={() => onCorrectOptionChange("1")}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {quizInfo[trace].options[1] ? quizInfo[trace].options[1] : ""}
            </button>
            <button
              id="2"
              style={{ backgroundColor: btnColors["2"] }}
              onClick={() => onCorrectOptionChange("2")}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {quizInfo[trace].options[2] ? quizInfo[trace].options[2] : ""}
            </button>
            <button
              id="3"
              style={{ backgroundColor: btnColors["3"] }}
              onClick={() => onCorrectOptionChange("3")}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {quizInfo[trace].options[3] ? quizInfo[trace].options[3] : ""}
            </button>
          </div>
          <div
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            className="flex flex-col justify-items-center items-center"
          >
            <div className="max-w-fit">
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={onSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
/* 
 <div class="w-full max-w-sm m-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Quiz
            </h3>
            <div>
              <h3>Timer: {timerValue}</h3>
            </div>
          </div>
          <div>
            <h3>{quizInfo[trace] ? quizInfo[trace].question : ""}</h3>
            <div>
              <div>
                {quizInfo[trace].options[0] ? quizInfo[trace].options[0] : ""}
                <input
                  type="radio"
                  value="0"
                  checked={selectedOption === "0"}
                  onChange={handleOptionChange}
                />
              </div>
              <div>
                {quizInfo[trace].options[2] ? quizInfo[trace].options[1] : ""}
                <input
                  type="radio"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={handleOptionChange}
                />
              </div>
              <div>
                {quizInfo[trace].options[2] ? quizInfo[trace].options[2] : ""}
                <input
                  type="radio"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={handleOptionChange}
                />
              </div>
              <div>
                {quizInfo[trace].options[3] ? quizInfo[trace].options[3] : ""}
                <input
                  type="radio"
                  value="3"
                  checked={selectedOption === "3"}
                  onChange={handleOptionChange}
                />
              </div>
            </div>
            <button onClick={onSubmitClick}>Submit</button>
          </div>
        </div> */
