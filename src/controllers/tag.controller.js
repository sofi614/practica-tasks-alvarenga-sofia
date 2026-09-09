import Tag from "../models/tag.model.js";
import Task from "../models/task.model.js";

const tagInclude = [{
    model: Task,
    as: "tasks",
    attributes: ["id", "title", "isComplete"]
}];

export const createTag = async (req, res) => {
    try {
        const { name, taskIds } = req.body || {};
        if (typeof name !== "string" || name.trim().length === 0) {
            return res.status(400).json({ message: "name debe ser una cadena no vacía" });
        }
        if (name.trim().length > 50) {
            return res.status(400).json({ message: "name no puede superar los 50 caracteres" });
        }
        if (!Array.isArray(taskIds) || taskIds.length === 0) {
            return res.status(400).json({ message: "taskIds debe ser un arreglo con al menos una tarea" });
        }

        const normalizedName = name.trim();
        const existingTag = await Tag.findOne({ where: { name: normalizedName } });
        if (existingTag) {
            return res.status(400).json({ message: "Ya existe una etiqueta con ese nombre" });
        }

        const tasks = await Task.findAll({ where: { id: taskIds } });
        if (tasks.length !== new Set(taskIds).size) {
            return res.status(404).json({ message: "Una o más tareas no existen" });
        }

        const tag = await Tag.create({ name: normalizedName });
        await tag.setTasks(tasks);
        const tagWithTasks = await Tag.findByPk(tag.id, { include: tagInclude });
        return res.status(201).json({ message: "Etiqueta creada exitosamente", tag: tagWithTasks });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la etiqueta", error: error.message });
    }
};

export const allTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ["id", "name"],
            include: tagInclude
        });
        return res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las etiquetas", error: error.message });
    }
};