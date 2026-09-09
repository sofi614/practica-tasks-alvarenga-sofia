import "dotenv/config";
import { Sequelize } from "sequelize";

const databaseName = process.env.DB_NAME || "tasks_users_db";
const databaseUser = process.env.DB_USER || "root";
const databasePassword = process.env.DB_PASSWORD || "";
const databaseHost = process.env.DB_HOST || "localhost";

export const sequelize = new Sequelize(
    databaseName,
    databaseUser,
    databasePassword,
    {
        host: databaseHost,
        dialect: "mysql",
        logging: false
    }
);

const crearBaseDeDatos = async () => {
    const adminConnection = new Sequelize({
        dialect: "mysql",
        host: databaseHost,
        username: databaseUser,
        password: databasePassword,
        logging: false
    });

    try {
        await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    } finally {
        await adminConnection.close();
    }
};

export const conectarDB = async () => {
    await crearBaseDeDatos();
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Base de datos conectada y tablas sincronizadas");
};

export default conectarDB;