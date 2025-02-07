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

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
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
  })
);

// Server healthcheck
app.get("/api/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server Running",
  });
});

// api middlewares
app.use("/api/auth", authRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
