import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NODE_ENV } from "./configs/server-config";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { responseTimings } from "./middlewares/api-respose";

const app = express();

// Setting the server configs
app.set("trust proxy", true);
app.use(express.json());
app.use(responseTimings);
app.use(
  cookieSession({
    signed: false,
    secure: NODE_ENV !== "test",
  })
);

// api middlewares

// Server healthcheck
app.get("/api/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server Running",
  });
});

app.get("*", async () => {
  throw new NotFoundError();
});

// Error Middleware
app.use(errorHandler);

export default app;
