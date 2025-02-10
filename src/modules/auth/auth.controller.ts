import { Request, Response } from "express";
import axios from "axios";
import JWT from "jsonwebtoken";
import { createNewUserRepo, getUserByEmailRepo } from "./auth.repo";
import { BadRequestError } from "../../errors/bad-request-error";
import { oauth2client } from "../../utils/google-config";
import { IGoogleResponse } from "../../interfaces/user.interface";
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_TIMEOUT,
} from "../../configs/server-config";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const auth_code = req.body;

    return res.status(201).json({
      message: "Successfully signed up",
      data: { auth_code },
    });
  } catch (error) {
    throw new BadRequestError("Server error");
  }
};

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { auth_code } = req.body;
    const googleResponse = await oauth2client.getToken(auth_code);
    oauth2client.setCredentials(googleResponse.tokens);

    const googleAccountData = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse?.tokens?.access_token}`,
    );

    const { email, name, picture } = googleAccountData.data;
    const nameSplit = name.split(" ");
    let userInput: IGoogleResponse = {
      firstName: nameSplit[0],
      lastName: nameSplit[nameSplit.length - 1],
      email: email,
      profileImage: picture as string,
    };

    const userExists = await getUserByEmailRepo(userInput.email);
    if (userExists) {
      const accessToken = JWT.sign(
        {
          email: userInput.email,
          userName: userExists.userName,
        },
        JSON.stringify(JWT_ACCESS_TOKEN_SECRET),
      );
      req.session = {
        access_token: accessToken,
      };
      return res.status(200).json({
        message: "User login successfully",
        data: userExists,
      });
    } else {
      const createdUser = await createNewUserRepo(userInput);
      const accessToken = JWT.sign(
        {
          email: createdUser.email,
          userName: createdUser.userName,
        },
        JSON.stringify(JWT_ACCESS_TOKEN_SECRET),
      );
      req.session = {
        access_token: accessToken,
      };
      if (!createdUser) {
        throw new BadRequestError("Error while signing up");
      }
      return res.status(201).json({
        message: "User created successfully",
        data: createdUser,
        access_token: accessToken,
      });
    }
  } catch (error: any) {
    console.log("error: " + JSON.stringify(error));
    throw new BadRequestError(error);
  }
};
