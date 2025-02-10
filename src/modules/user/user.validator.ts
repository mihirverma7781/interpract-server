import { body } from "express-validator";

export const onboardingValidator = () => {
  return [
    body("jobDescription")
      .trim()
      .isString()
      .isLength({
        min: 3,
        max: 100,
      })
      .exists()
      .withMessage("Job description should me minimum 3 characters"),
    body("experience")
      .trim()
      .isNumeric()
      .exists()
      .withMessage("Experience is required"),
    body("techStack")
      .isArray({
        min: 1,
      })
      .exists()
      .withMessage("Tech stack is required"),
  ];
};
