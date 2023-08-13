import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizTable from "../../../components/quizTable/QuizTable";

const StudentResult = () => {
  const [result, setResult] = useState();

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  /* fetches the student result using name and quiz code */
  useEffect(() => {
    fetch("http://localhost:5000/getStudentResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_quizCode")),
        name: JSON.parse(sessionStorage.getItem("student_name")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          console.log("Quiz", data.user);
          setResult(data.user);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-5 bg-gray-700 min-h-screen">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      {/* Display the Student Result */}
      <div class="relative overflow-x-auto grid grid-cols-1 justify-items-center items-center m-5">
        <h3 className="text-2xl text-indigo-50">Student Result</h3>

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-20">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>

              <th scope="col" class="px-6 py-3">
                Marks
              </th>

              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row "
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {result ? result.name : ""}
              </th>
              <td class="px-6 py-4">{result ? result.marks : ""}</td>
              <td class="px-6 py-4">{result ? result.status : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <QuizTable
        quizCode={JSON.parse(sessionStorage.getItem("student_quizCode"))}
      />
    </div>
  );
};
export default StudentResult;
