import { AuthRouter } from "../modules/index";
import express from "express";

const router = express.Router();

router.use("/auth", AuthRouter);

export default router;
