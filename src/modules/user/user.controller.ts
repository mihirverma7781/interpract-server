import { Request, Response } from "express";
import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";
import { onboardUserRepo } from "./user.repo";
import { IUserAtters } from "interfaces/user.interface";

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
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export const onboardingController = async (req: Request, res: Response) => {
  try {
    const userData = req.currentUser!;
    const onboardingData = req.body;

    const updateUser = await onboardUserRepo(onboardingData, userData?.id);

    if (!updateUser) {
      throw new BadRequestError("Error onboarding user");
    }
    return res.status(200).json({
      message: "User onboarded successfully",
      data: updateUser,
    });
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};
