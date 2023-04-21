import { useEffect, useState } from "react";

export const useLecturerInfo = () => {
  const [lecturerInfo, setLecturerInfo] = useState(
    /* () => {
    // Load lecturerInfo from localStorage if it exists
    const JSONlecturerInfo = localStorage.getItem("lecturerInfo");
    if (JSONlecturerInfo) {
      const { data } = JSON.parse(JSONlecturerInfo);
      return data;
    }
    return  */ {
      name: undefined,
      email: "",
      courseList: ["DS", "Java", "Algorithm Analysis"],
      qidList: [],
    }
  ); /* 
  // Save admin to localStorage when it changes
  useEffect(() => {
    if (lecturerInfo) {
      localStorage.setItem(
        "lecturerInfo",
        JSON.stringify({ data: lecturerInfo })
      );
    } else {
      localStorage.removeItem("lecturerInfo");
    }
  }, [lecturerInfo]);
 */
  const updateLecturerEmail = (value) => {
    setLecturerInfo({
      ...lecturerInfo,
      email: value,
    });
    console.log(lecturerInfo);
  };
  /* 
  const updateLecturerCourseList = (value) => {
    setLecturerInfo((prev) => ({
      ...prev,
      courseList: [...prev.courseList, value],
    }));
    console.log(value);
    console.log(lecturerInfo);
  };
 */
  useEffect(() => {
    const fetchLecturer = () => {
      if (lecturerInfo.email) {
        fetch("http://localhost:5000/fetchLecturerInfo", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: lecturerInfo.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.user) {
              console.log(data.user);
              setLecturerInfo({
                ...lecturerInfo,
                ...data.user,
              });
            } else {
              console.log(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchLecturer();
  }, [lecturerInfo]);
  return [lecturerInfo, updateLecturerEmail];
};

export const useQidOfCurrentQuizUpdate = () => {
  const [qidOfCurrentQuizUpdate, setQidOfCurrentQuizUpdate] = useState();

  const updateQidOfCurrentQuizUpdate = (value) => {
    setQidOfCurrentQuizUpdate(value);
  };

  useEffect(() => {
    const fetchQidOfCurrentQuizUpdate = async () => {
      const response = await fetch(
        "http://localhost:5000/fetchQidOfCurrentQuizUpdateInfo"
      );
      const data = await response.json();

      setQidOfCurrentQuizUpdate({
        ...data,
      });
    };
    fetchQidOfCurrentQuizUpdate();
  }, []);
  return [qidOfCurrentQuizUpdate, updateQidOfCurrentQuizUpdate];
};

export const useQuizList = () => {
  const [quizQuestionListInfo, setQuizQuestionListInfo] = useState({
    qidOfCurrentQuizView: undefined,
    quizQuestionList: [],
    quizAnswerList: [],
    trace: 0,
  });

  const updateQuizListInfo = (prop, value) => {
    setQuizQuestionListInfo({
      ...quizQuestionListInfo,
      [prop]: value,
    });
  };

  useEffect(() => {
    const fetchQuizList = async () => {
      const response = await fetch("http://localhost:5000/fetchQuizListInfo");
      const data = await response.json();

      setQuizQuestionListInfo({
        ...data,
      });
    };
    fetchQuizList();
  }, []);
  return [quizQuestionListInfo, updateQuizListInfo];
};
