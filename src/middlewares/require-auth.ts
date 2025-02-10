import { JWT_ACCESS_TOKEN_SECRET } from "../configs/server-config";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmailRepo } from "../modules/auth/auth.repo";
import { IUserAtters } from "interfaces/user.interface";

interface IUserPayload {
  userName: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserAtters;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("[MIDDLEWARE] Access token: ", req.session);
  const token = req.session && req.session.access_token;
  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    console.log("[MIDDLEWARE] Access token: ", token);
    const payload = jwt.verify(
      token,
      JSON.stringify(JWT_ACCESS_TOKEN_SECRET)!,
    ) as IUserPayload;
    const userData = await getUserByEmailRepo(payload.email);
    if (!userData) {
      throw new UnauthorizedError();
    }
    req.currentUser = userData;
    return next();
  } catch (error) {
    console.error("[MIDDLEWARE]: ", error);
    throw new UnauthorizedError();
  }
};
