import {DataTypes} from "sequelize";
import { sequelize } from "../config/database.js";

const Task = sequelize.define("Task" , {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name:{
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    email:{
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true
    },
    password : {
         type: DataTypes.STRING(100), 
         allowNull: false
    }
});

export default Task;
