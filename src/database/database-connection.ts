import { DB } from "./database-config";

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connectDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => {
        console.info("[DB] Database connected successfully!");
      })
      .catch((error: any) => {
        console.error("[DB] Unable to connect to the database:", error);
      });
  }

  async syncDatabase(sequelize: any) {
    await sequelize.sync({ force: true });
    console.info("[DB] All models were synchronized successfully.");
  }
}

export default Database;
