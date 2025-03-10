import express from "express";
import { saveAnswerValidator } from "./answer.validator";
import { validateRequest } from "../../middlewares/request-validation";
import { requireAuth } from "../../middlewares/require-auth";
import {
  saveAnswerController,
  getAllAnswersController,
} from "./answer.controller";

const answerRouter = express.Router();

answerRouter.post(
  "/save",
  saveAnswerValidator(),
  validateRequest,
  requireAuth,
  saveAnswerController,
);

answerRouter.get(
  "/:interviewId",
  validateRequest,
  requireAuth,
  getAllAnswersController,
);

export default answerRouter;
