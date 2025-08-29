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

export const getAllInterviewsRepo = async (userId: string) => {
  try {
    const interviews = await DB.Interview.findAll({
      where: {
        userId: userId,
      },
    });
    return interviews;
    return;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};

export const getInterviewByIdRepo = async (
  userId: string,
  interviewId: string,
) => {
  try {
    const interview = await DB.Interview.findOne({
      where: {
        userId: userId,
        id: interviewId,
      },
    });
    return interview?.toJSON();
    return;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};

export const updateInterviewDurationRepo = async (userId: string, interviewId: string, data: any) => {
  try {
    const interview = await DB.Interview.update(data, {
      where: {
        userId: userId,
        id: interviewId,
      },
    });

    return interview;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
}
