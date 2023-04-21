import { useNavigate } from "react-router-dom";

const QuizCard = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    props.onPageChange();
  };

  const onStartQuizClick = () => {
    navigate("/result");
  };

  return (
    <div>
      <h3>{props.courseName}</h3>
      <button>View</button>
      <button onClick={handleClick}>Update</button>
      <button onClick={onStartQuizClick}>StartQuiz</button>
    </div>
  );
};

export default QuizCard;
