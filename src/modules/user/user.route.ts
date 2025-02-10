import express from "express";
import { validateRequest } from "../../middlewares/request-validation";
import { meController, onboardingController } from "./user.controller";
import { requireAuth } from "../../middlewares/require-auth";
import { onboardingValidator } from "./user.validator";

const userRouter = express.Router();

userRouter.get("/me", requireAuth, meController);
userRouter.patch(
  "/onboard",
  onboardingValidator(),
  requireAuth,
  onboardingController,
);

export default userRouter;
