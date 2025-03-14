import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";
import { NODE_ENV } from "./configs/server-config";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { responseTimings } from "./middlewares/api-respose";
import RootRouter from "./router/routes";
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import interviewRouter from "./modules/interview/interview.route";
import answerRouter from "./modules/answer/answer.route";

const app = express();
const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true, // Allow cookies & authentication headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Setting the server configs
app.set("trust proxy", true);
app.use(express.json());
app.use(responseTimings);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  }),
);

// Server healthcheck
app.get("/api/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server Running",
  });
});

// api middlewares
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/answer", answerRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
