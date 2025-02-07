import { body } from "express-validator";

export const authCodeValidator = () => {
  return [
    body("auth_code").trim().exists().withMessage("auth_code must be valid"),
  ];
};
