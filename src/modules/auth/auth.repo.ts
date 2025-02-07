import { IGoogleResponse } from "../../interfaces/user.interface";
import { DB } from "../../database/database-config";
import { BadRequestError } from "errors/bad-request-error";
import { generateUsername } from "unique-username-generator";

export const getUserByEmailRepo = async (userInput: IGoogleResponse) => {
  try {
    const userExists = await DB.User.findOne({
      where: { email: userInput.email },
    });

    return userExists;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};

export const createNewUserRepo = async (userInput: IGoogleResponse) => {
  try {
    const userExists = await DB.User.create({
      ...userInput,
      userName: generateUsername("-"),
    });

    return userExists;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};
