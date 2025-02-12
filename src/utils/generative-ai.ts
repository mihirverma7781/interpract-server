import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GEMINI_API_KEY } from "../configs/server-config";
import { IGemniConfig } from "../interfaces/gemni.interface";

const apiKey: string = GEMINI_API_KEY as string; // Assuming GEMINI_API_KEY is set in the environment variables
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig: IGemniConfig = {
  temperature: 1.3,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});
