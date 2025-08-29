import express from "express";
import { validateRequest } from "../../middlewares/request-validation";
import {
  createInterviewController,
  getAllInterviewsController,
  getInterviewController,
  updateDurationController,
} from "./interview.controller";
import { requireAuth } from "../../middlewares/require-auth";
import { createInterviewValidator, updateDurationValidator } from "./interview.validator";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  createInterviewValidator(),
  validateRequest,
  requireAuth,
  createInterviewController,
);

interviewRouter.patch(
  "/duration/:id",
  updateDurationValidator(),
  validateRequest,
  requireAuth,
  updateDurationController,
);

interviewRouter.get("/", requireAuth, getAllInterviewsController);

interviewRouter.get("/:id", requireAuth, getInterviewController);

export default interviewRouter;
