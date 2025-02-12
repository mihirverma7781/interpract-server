import { BadRequestError } from "../../errors/bad-request-error";
import { Request, Response } from "express";
import {
  IGemniConfig,
  IInterviewInput,
} from "../../interfaces/gemni.interface";
import { chatSession } from "../../utils/generative-ai";
import { createInterviewRepo } from "./interview.repo";

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
    console.log("formatted Response:", formattedResponse);

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
