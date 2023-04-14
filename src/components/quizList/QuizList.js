import QuizCard from "../quizCard/QuizCard";
import { useNavigate } from "react-router-dom";
import { useLecturerInfo } from "../../hooks/fetchLecturerDashboardDetails";

const QuizList = (props) => {
  const navigate = useNavigate();

  const [lecturerInfo] = useLecturerInfo();

  const handleClick = () => {
    props.onPageChange();
  };

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      <div>
        {lecturerInfo.courseList.map((courseName) => (
          <QuizCard key={courseName} courseName={courseName} />
        ))}
      </div>
      <button onClick={handleClick}>Create Quiz</button>
    </div>
  );
};

export default QuizList;
