import {Sequelize} from "sequelize"; 

export const sequelize = new Sequelize ("tasks_users_db" , "root", "",{
    host: "localhost",
    dialect: "mysql",
    logging: false
})

export const conectarDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("conexion a base de datos exitosa");
        await sequelize.sync();
        console.log("tablas sincronizadas");

    } catch (error) {
        console.log("fallo al concetar a la base de datos:", error);
    }
}