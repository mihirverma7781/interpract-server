export interface IUserAtters {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  jobDescription: string | null;
  experience: number;
  techStack: string[];
  password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
