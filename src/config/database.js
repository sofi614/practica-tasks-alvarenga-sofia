import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME || "tasks_users_db",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false
    }
);

export const conectarDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Base de datos conectada y tablas sincronizadas");
};

export default conectarDB;