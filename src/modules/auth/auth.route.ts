import express from "express";
import { authCodeValidator } from "./auth.validator";
import { validateRequest } from "../../middlewares/request-validation";
import { signUpController, googleLoginController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  authCodeValidator(),
  validateRequest,
  signUpController
);

authRouter.post(
  "/google",
  authCodeValidator(),
  validateRequest,
  googleLoginController
);

export default authRouter;
