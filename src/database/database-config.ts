import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../configs/server-config";
import Sequelize from "sequelize";
import userModel from "./models/user-model";
import interviewModel from "./models/interview-model";

const sequelize = new Sequelize.Sequelize(
  DB_NAME as string,
  DB_USERNAME as string,
  DB_PASSWORD as string,
  {
    dialect: (DB_DIALECT as Sequelize.Dialect) || "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT as string, 10),
    define: {
      charset: "utf8mb4",
      underscored: true,
    },
  },
);

// Initialize models
const User = userModel(sequelize);
const Interview = interviewModel(sequelize);

// Define associations after models are initialized
User.hasMany(Interview, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Interview.belongsTo(User);

export const DB = {
  Sequelize,
  sequelize,
  User: userModel(sequelize),
  Interview: interviewModel(sequelize),
};
