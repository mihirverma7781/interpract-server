import { PORT } from "./configs/server-config";
import app from "./app";
import Database from "./database/database-connection";
import { DB } from "./database/database-config";

// Server Listener & Database Connection
const startServer = async () => {
  try {
    const databaseInstance = Database.getInstance();
    await databaseInstance.connectDatabase();
    await databaseInstance.syncDatabase(DB.sequelize);

    app.listen(PORT, () => {
      console.log(`Server Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
