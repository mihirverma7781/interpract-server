export interface IAnswerAtters {
  id: string;
  interviewId: string;
  questionId: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  feedback: string;
  rating: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnswerInput {
  interviewId: string;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
}
