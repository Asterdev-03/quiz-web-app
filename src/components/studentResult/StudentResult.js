import { useEffect, useState } from "react";

const StudentResult = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getStudentResult", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: JSON.parse(sessionStorage.getItem("student_code")),
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
    <div>
      <h3>Student Result</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{result ? result.name : ""}</td>
            <td>{result ? result.marks : ""}</td>
            <td>{result ? result.status : ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default StudentResult;
