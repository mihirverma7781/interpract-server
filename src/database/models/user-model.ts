import { Sequelize, DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { generateUsername } from "unique-username-generator";
import { IUserAtters } from "interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";

// Define the creation attributes (excluding ID and timestamps which are auto-generated)
interface UserCreationAttributes
  extends Optional<
    IUserAtters,
    "id" | "createdAt" | "updatedAt" | "onboarded"
  > {}

class User
  extends Model<IUserAtters, UserCreationAttributes>
  implements IUserAtters
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public userName!: string;
  public email!: string;
  public onboarded!: boolean;
  public jobDescription!: string | null;
  public experience!: number | null;
  public techStack!: string[] | null;
  public password!: string | null;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

export default function (sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      onboarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      jobDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      experience: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0,
      },
      techStack: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
}
