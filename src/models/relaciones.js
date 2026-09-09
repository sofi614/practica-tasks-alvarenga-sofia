import User from "./user.model.js";
import Task from "./task.model.js";
import Profile from "./profile.model.js";
import Tag from "./tag.model.js";

User.hasMany(Task, {
	foreignKey: "userId",
	as: "tasks",
	onUpdate: "CASCADE",
	onDelete: "CASCADE"
});
Task.belongsTo(User, {
	foreignKey: "userId",
	as: "user",
	onUpdate: "CASCADE",
	onDelete: "CASCADE"
});

User.hasOne(Profile, {
	foreignKey: "userId",
	as: "profile",
	onUpdate: "CASCADE",
	onDelete: "CASCADE"
});
Profile.belongsTo(User, {
	foreignKey: "userId",
	as: "user",
	onUpdate: "CASCADE",
	onDelete: "CASCADE"
});

Task.belongsToMany(Tag, {
	through: "TaskTags",
	foreignKey: "taskId",
	otherKey: "tagId",
	as: "tags",
	onDelete: "CASCADE"
});
Tag.belongsToMany(Task, {
	through: "TaskTags",
	foreignKey: "tagId",
	otherKey: "taskId",
	as: "tasks",
	onDelete: "CASCADE"
});

export { User, Task, Profile, Tag };