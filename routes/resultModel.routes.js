import express from "express";

import {
  getResult,
  joinQuiz,
  getQuizStatus,
  setQuizStatus,
  putStudentInfo,
  getQuizQuestions,
  getStudentResult,
  setStudentResult,
} from "../controllers/resultModel.controller";

const router = express.Router();

router.route("/").post(getResult);
router.route("/").post(joinQuiz);
router.route("/").post(getQuizStatus);
router.route("/").post(setQuizStatus);
router.route("/").post(putStudentInfo);
router.route("/").post(getQuizQuestions);
router.route("/").post(getStudentResult);
router.route("/").post(setStudentResult);

export default router;
