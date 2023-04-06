const JoinQuiz = () => {
  return (
    <div>
      <h2>Join a Quiz</h2>
      <form>
        <input
          type="text"
          id="student-name"
          name="student-name"
          placeholder="Enter name"
          required
        />
        <br />
        <input
          type="text"
          id="quiz-code"
          name="quiz-code"
          placeholder="Enter Code"
          required
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default JoinQuiz;
