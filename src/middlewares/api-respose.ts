import { NextFunction, Request, Response } from "express";

export function responseTimings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  res.on("finish", function () {
    const duration = Date.now() - startTime;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 500) {
      console.error(message);
    } else if (res.statusCode >= 400) {
      console.warn(message);
    } else {
      console.info(message);
    }
  });
  next();
}
