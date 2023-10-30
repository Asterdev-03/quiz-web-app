import { useEffect, useState } from "react";

const QuizTable = (props) => {
  const [resultReport, setResultReport] = useState([]);

  /* fetches the result report of the quiz */
  useEffect(() => {
    fetch("https://quiz-web-app-api.vercel.app/getResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: props.quizCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // console.log("result: ", data.result);
          const sortedData = [...data.result].sort((a, b) => b.marks - a.marks);
          setResultReport(sortedData);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <div class="grid grid-cols-1 justify-items-center items-center m-5">
        {/* Displays the Result Report */}
        <h3 className="text-2xl text-indigo-50">Leaderboard</h3>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            {resultReport.map((student) => (
              <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {student.name}
                </th>
                <td class="px-6 py-4">{student.marks}</td>
                <td class="px-6 py-4">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizTable;
