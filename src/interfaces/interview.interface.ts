export interface IInterviewAtters {
  id: string;
  experience: number;
  jobDescription: string;
  techStack: string;
  difficulty: string;
  content: string | null;
  company?: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInterviewConfigInput {
  experience: number;
  jobDescription: string;
  techStack: string;
  difficulty: string;
  company?: string | null;
}
