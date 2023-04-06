import QuizCard from "../quizCard/QuizCard";

const QuizList = (props) => {
  const handleClick = () => {
    props.onPageChange();
  };

  return (
    <div>
      <div>
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
      <button onClick={handleClick}>Create Quiz</button>
    </div>
  );
};

export default QuizList;
