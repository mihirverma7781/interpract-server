import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err?.statusCode).json({ errors: err.serializeErrors() });
  }

  console.error("Error Occurred:", err);
  return res.status(400).json({
    errors: [
      {
        message: err.message,
      },
    ],
  });
}
