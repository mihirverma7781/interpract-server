import { IInterviewAtters } from "interfaces/interview.interface";
import { Sequelize, DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import User from "./user-model"; // Import the User model

interface InterviewCreationAttributes
  extends Optional<
    IInterviewAtters,
    "id" | "createdAt" | "updatedAt"
  > { }

class Interview
  extends Model<IInterviewAtters, InterviewCreationAttributes>
  implements IInterviewAtters {
  public id!: string;
  public experience!: number;
  public jobDescription!: string;
  public techStack!: string;
  public difficulty!: string;
  public company!: string | null;
  public content!: string | null;
  public startTime?: Date | null;
  public endTime?: Date | null;
  public attempted!: Boolean;
  public userId!: string; // Foreign key to User model
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export default function (sequelize: Sequelize) {
  Interview.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      jobDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      techStack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      attempted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "Interview",
      timestamps: true,
      underscored: true,
    },
  );

  return Interview;
}
