import User from "./user.model.js";
import Task from "./task.model.js";
import Profile from "./profile.model.js";

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Task, Profile };