import express from "express";
import { validateRequest } from "../../middlewares/request-validation";
import { createInterviewController } from "./interview.controller";
import { requireAuth } from "../../middlewares/require-auth";
import { createInterviewValidator } from "./interview.validator";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  createInterviewValidator(),
  validateRequest,
  requireAuth,
  createInterviewController,
);

export default interviewRouter;
