import { Request, Response } from "express";
import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";

export const meController = async (req: Request, res: Response) => {
  try {
    const userData = req.currentUser;
    if (!userData) {
      throw new BadRequestError("User not found");
    }
    return res.status(200).json({
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (error) {
    throw new BadRequestError("Server error");
  }
};
