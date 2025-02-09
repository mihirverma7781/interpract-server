import { IGoogleResponse } from "../../interfaces/user.interface";
import { DB } from "../../database/database-config";
import { BadRequestError } from "../../errors/bad-request-error";
import { generateUsername } from "unique-username-generator";

export const getUserByEmailRepo = async (email: string) => {
  try {
    const userExists = await DB.User.findOne({
      where: { email: email },
    });
    return userExists;
  } catch (error: any) {
    throw new BadRequestError("API error: " + error.message);
  }
};

export const createNewUserRepo = async (userInput: IGoogleResponse) => {
  try {
    const createUser = await DB.User.create({
      ...userInput,
      userName: generateUsername("-"),
    });

    return createUser.toJSON();
  } catch (error: any) {
    console.log("[REPO]: ", error);
    throw new BadRequestError("API error: " + error.message);
  }
};
