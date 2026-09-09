import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Profile = sequelize.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bio: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "profiles"
});

export default Profile;