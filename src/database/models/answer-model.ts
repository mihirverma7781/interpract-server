import { IAnswerAtters } from "interfaces/answer.interface";
import { Sequelize, DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";

interface AnswerCreationAttributes
  extends Optional<IAnswerAtters, "id" | "createdAt" | "updatedAt"> {}

class Answer
  extends Model<IAnswerAtters, AnswerCreationAttributes>
  implements IAnswerAtters
{
  public id!: string;
  public interviewId!: string;
  public questionId!: string;
  public question!: string;
  public correctAnswer!: string;
  public userAnswer!: string;
  public feedback!: string;
  public rating!: string;
  public userId!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export default function (sequelize: Sequelize) {
  Answer.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      interviewId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "interviews",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      questionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      userAnswer: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      feedback: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Answer",
      timestamps: true,
      underscored: true,
    },
  );

  return Answer;
}
