import { AuthRouter, UserRouter } from "../modules/index";
import express from "express";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

export default router;
