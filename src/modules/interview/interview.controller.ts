import { BadRequestError } from "../../errors/bad-request-error";
import { Request, Response } from "express";
import {
  IGemniConfig,
  IInterviewInput,
} from "../../interfaces/gemni.interface";
import { chatSession } from "../../utils/generative-ai";
import {
  createInterviewRepo,
  getAllInterviewsRepo,
  getInterviewByIdRepo,
} from "./interview.repo";

export const createInterviewController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      company,
      difficulty,
      experience,
      jobDescription,
      techStack,
    }: IInterviewInput = req.body;
    const userId = req.currentUser?.id;

    const inputPrompt = `Company: ${company}, Job Description: ${jobDescription}, Tech Stack: ${techStack}, Experience: ${experience}, Difficulty: ${difficulty}. With this information prepare a tech interview with 20 questions and answers in json format make question, answer and id as a key in that JSON.`;
    const gemniResponse = await chatSession.sendMessage(inputPrompt);
    const formattedResponse = JSON.parse(
      gemniResponse.response.text().replace("```json", "").replace("```", ""),
    );

    // Save the interview in the database
    const interviewInput: any = {
      company,
      difficulty,
      experience,
      jobDescription,
      techStack,
      content: formattedResponse,
      userId,
    };

    const createdInterview = await createInterviewRepo(interviewInput);
    return res.status(201).json({
      message: "Successfully initialized the interview",
      data: createdInterview,
    });
  } catch (error) {
    throw new BadRequestError("Server error");
  }
};

export const getAllInterviewsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.currentUser?.id!;
    const allInterviews = await getAllInterviewsRepo(userId);
    return res.status(200).json({
      message: "Successfully fetched all interviews",
      data: allInterviews,
    });
  } catch (error) {
    throw new BadRequestError("Server error");
  }
};

export const getInterviewController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.currentUser?.id!;
    const interviewId: string = req.params?.id!;

    const interviewResponse = await getInterviewByIdRepo(userId, interviewId);
    return res.status(201).json({
      message: "Successfully fetched interview",
      data: interviewResponse,
    });
  } catch (error) {
    throw new BadRequestError("Server error");
  }
};
