import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../configs/server-config";
import Sequelize from "sequelize";

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
    pool: {
      min: 0,
      max: 5,
    },
  }
);

export const DB = {
  sequelize,
  Sequelize,
};
