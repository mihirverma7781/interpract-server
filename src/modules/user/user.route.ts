import express from "express";
import { validateRequest } from "../../middlewares/request-validation";
import { meController } from "./user.controller";
import { requireAuth } from "../../middlewares/require-auth";

const userRouter = express.Router();

userRouter.get("/me", requireAuth, meController);

export default userRouter;
