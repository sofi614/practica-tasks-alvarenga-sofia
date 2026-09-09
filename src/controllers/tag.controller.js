import Tag from "../models/tag.model.js";
import Task from "../models/task.model.js";
import { matchedData } from "express-validator";

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

export const updateTag = async (req, res) => {
    try {
        const { id, ...tagData } = matchedData(req);
        if (Object.keys(tagData).length === 0) {
            return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar" });
        }

        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }

        if (tagData.name) {
            tagData.name = tagData.name.trim();
            const existingTag = await Tag.findOne({ where: { name: tagData.name } });
            if (existingTag && existingTag.id !== tag.id) {
                return res.status(400).json({ message: "Ya existe una etiqueta con ese nombre" });
            }
        }

        if (tagData.taskIds) {
            const tasks = await Task.findAll({ where: { id: tagData.taskIds } });
            if (tasks.length !== new Set(tagData.taskIds).size) {
                return res.status(404).json({ message: "Una o más tareas no existen" });
            }
            await tag.setTasks(tasks);
            delete tagData.taskIds;
        }

        await tag.update(tagData);
        const updatedTag = await Tag.findByPk(tag.id, { include: tagInclude });
        return res.status(200).json({ message: "Etiqueta actualizada exitosamente", tag: updatedTag });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la etiqueta", error: error.message });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        await tag.destroy();
        return res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la etiqueta", error: error.message });
    }
};