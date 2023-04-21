const QuizResult = ({ students }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Marks</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.name}>
            <td>{student.name}</td>
            <td>{student.marks}</td>
            <td>{student.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuizResult;
