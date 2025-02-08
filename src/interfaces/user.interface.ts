export interface IUserAtters {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  onboarded: boolean;
  jobDescription: string | null;
  experience: number | null;
  techStack: string[] | null;
  password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGoogleResponse {
  firstName: string;
  lastName: string;
  email: string;
}
