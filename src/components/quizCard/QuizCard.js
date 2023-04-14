const QuizCard = (props) => {
  const handleClick = () => {
    props.onPageChange();
  };

  return (
    <div>
      <h3>{props.courseName}</h3>
      <button>View</button>
      <button onClick={handleClick}>Update</button>
      <button>StartQuiz</button>
    </div>
  );
};

export default QuizCard;
