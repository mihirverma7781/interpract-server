import { BadRequestError } from "../../errors/bad-request-error";
import { Request, Response } from "express";
import { chatSession } from "../../utils/generative-ai";
import { IAnswerInput } from "../../interfaces/answer.interface";
import { createAnswerRepo, getAllAnswersRepo } from "./answer.repo";

export const saveAnswerController = async (req: Request, res: Response) => {
  try {
    const {
      interviewId,
      questionId,
      question,
      userAnswer,
      correctAnswer,
    }: IAnswerInput = req.body;
    const userId = req.currentUser?.id;

    const inputPrompt = `Question: ${question}, User Answer: ${userAnswer}. With this information of a tech interview question and user answer provide provide a
      rating for the user answer and feedback as an area of improvement if any in just 3 to 5 lines. Provide this in JSON format with rating and feedback as keys.`;
    const gemniResponse = await chatSession.sendMessage(inputPrompt);
    const formattedResponse = JSON.parse(
      gemniResponse.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim(),
    );

    if (
      !formattedResponse ||
      !formattedResponse?.feedback ||
      !formattedResponse?.rating
    ) {
      throw new BadRequestError("Invalid response from the AI");
    }

    // Save the answer in the database
    const answerInput: any = {
      interviewId,
      questionId,
      question,
      userAnswer,
      correctAnswer,
      userId,
      feedback: formattedResponse?.feedback,
      rating: formattedResponse?.rating,
    };

    const createdAnswer = await createAnswerRepo(answerInput);
    return res.status(201).json({
      message: "Successfully saved the answer",
      data: formattedResponse,
    });
  } catch (error: any) {
    console.error("Failed to save the answer:", error);
    throw new BadRequestError(error?.message);
  }
};

export const getAllAnswersController = async (req: Request, res: Response) => {
  try {
    const interviewId = req.params.interviewId;
    const userId = req.currentUser?.id;

    // Get all the answers for the given interview
    const answers = await getAllAnswersRepo(interviewId, userId);

    if (!answers) {
      return new BadRequestError("No answers found for the given interview");
    }

    return res.status(200).json({
      message: "Successfully fetched all answers",
      data: answers,
    });
  } catch (error: any) {
    console.error("Failed to get all answers:", error);
    throw new BadRequestError(error?.message);
  }
};
