import { body } from "express-validator";

export const createInterviewValidator = () => {
  return [
    body("experience")
      .trim()
      .isNumeric()
      .exists()
      .withMessage("experience must be valid"),
    body("difficulty")
      .trim()
      .toLowerCase()
      .exists()
      .isIn(["easy", "medium", "hard"])
      .withMessage("difficulty must be valid"),
    body("jobDescription")
      .trim()
      .toLowerCase()
      .exists()
      .withMessage("job description must be valid"),
    body("techStack")
      .trim()
      .toLowerCase()
      .exists()
      .withMessage("tech stack must be valid"),
    body("company").trim(),
  ];
};
