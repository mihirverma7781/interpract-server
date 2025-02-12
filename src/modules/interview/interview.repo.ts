import { IInterviewInput } from "../../interfaces/gemni.interface";
import { DB } from "../../database/database-config";
import { BadRequestError } from "../../errors/bad-request-error";

export const createInterviewRepo = async (interviewInput: any) => {
  try {
    const createInterview = await DB.Interview.create({
      ...interviewInput,
    });

    return createInterview.toJSON();
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};
