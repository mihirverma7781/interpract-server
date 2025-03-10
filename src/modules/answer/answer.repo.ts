import { DB } from "../../database/database-config";
import { BadRequestError } from "../../errors/bad-request-error";

export const createAnswerRepo = async (answerInput: any) => {
  try {
    const createAnswer = await DB.Answer.create({
      ...answerInput,
    });

    return createAnswer.toJSON();
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};

export const getAllAnswersRepo = async (interviewId: string, userId: any) => {
  try {
    const answers = await DB.Answer.findAll({
      where: {
        interviewId,
        userId,
      },
    });

    return answers;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};
