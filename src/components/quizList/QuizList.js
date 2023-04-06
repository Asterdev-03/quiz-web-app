import QuizCard from "../quizCard/QuizCard";

const QuizList = (props) => {
  const createdQuizzes = {
    name1: "FLAT",
    name2: "DS",
    name3: "DAA",
    name4: "MSS",
  };

  const handleClick = () => {
    props.onPageChange();
  };

  return (
    <div>
      <div>
        {Object.values(createdQuizzes).map((name) => (
          <QuizCard key={name} quizname={name} />
        ))}
      </div>
      <button onClick={handleClick}>Create Quiz</button>
    </div>
  );
};

export default QuizList;
