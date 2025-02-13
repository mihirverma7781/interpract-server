import express from "express";
import { validateRequest } from "../../middlewares/request-validation";
import {
  createInterviewController,
  getAllInterviewsController,
  getInterviewController,
} from "./interview.controller";
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

interviewRouter.get("/", requireAuth, getAllInterviewsController);

interviewRouter.get("/:id", requireAuth, getInterviewController);

export default interviewRouter;
