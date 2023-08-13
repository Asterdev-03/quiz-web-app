import express from "express";

import { updateQuiz, getQuiz } from "../controllers/quizzesModel.controller";

const router = express.Router();

router.route("/").post(updateQuiz);
router.route("/").post(getQuiz);

export default router;
