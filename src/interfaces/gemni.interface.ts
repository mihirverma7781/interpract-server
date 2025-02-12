export interface IGemniConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  responseMimeType: string;
}

export interface IInterviewInput {
  company: string;
  difficulty: string;
  experience: number;
  jobDescription: string;
  techStack: string;
}
