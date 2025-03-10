import { body } from "express-validator";

export const saveAnswerValidator = () => {
  return [
    body("interviewId")
      .trim()
      .exists()
      .withMessage("interview id must be valid"),
    body("questionId").trim().exists().withMessage("question id must be valid"),
    body("question")
      .trim()
      .toLowerCase()
      .exists()
      .withMessage("question must be valid"),
    body("userAnswer")
      .trim()
      .toLowerCase()
      .exists()
      .withMessage("user answer must be valid string"),
    body("correctAnswer")
      .trim()
      .toLowerCase()
      .exists()
      .withMessage("ca must be valid string"),
  ];
};
