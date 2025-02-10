import { DB } from "../../database/database-config";
import { BadRequestError } from "../../errors/bad-request-error";

export const onboardUserRepo = async (onboardInput: any, userId: string) => {
  try {
    const { experience, jobDescription, techStack } = onboardInput;
    const updatedUser = await DB.User.update(
      {
        experience,
        jobDescription,
        techStack,
        onboarded: true,
      },
      {
        where: { id: userId },
        returning: true,
      },
    );
    if (!updatedUser) {
      throw new BadRequestError("[REPO ERROR]: Error updating user");
    }
    return updatedUser[1][0];
  } catch (error: any) {
    console.log("[REPO ERROR]: ", error.message);
    new BadRequestError("Something went wrond");
  }
};
