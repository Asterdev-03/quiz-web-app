import express from "express";

import {
  signupLecturer,
  loginLecturer,
  getQuizList,
} from "../controllers/lecturerModel.controller";

const router = express.Router();

router.route("/").post(signupLecturer);
router.route("/").post(loginLecturer);
router.route("/").post(getQuizList);

export default router;
