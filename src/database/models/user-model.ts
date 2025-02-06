import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { generateUsername } from "unique-username-generator";
import { IUserAtters } from "interfaces/user.interface";

// Define the creation attributes (excluding ID and timestamps which are auto-generated)
interface UserCreationAttributes
  extends Optional<IUserAtters, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<IUserAtters, UserCreationAttributes>
  implements IUserAtters
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public userName!: string;
  public email!: string;
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
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        validate: {
          isAlphanumeric: true,
          len: [3, 20],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      hooks: {
        beforeCreate: async (user) => {
          user.userName = generateUsername("-");
        },
      },
    }
  );
}
