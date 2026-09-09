import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete, userId } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "title y description son obligatorios" });
        }
        if (title.length > 100 || description.length > 100) {
            return res.status(400).json({ message: "Los campos no pueden superar los 100 caracteres" });
        }
        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({ message: "isComplete debe ser un valor booleano" });
        }
        const tituloExistente = await Task.findOne({ where: { title } });
        if (tituloExistente) {
            return res.status(400).json({ message: "Ya existe una tarea con ese título" });
        }
        const newTask = await Task.create({ title, description, isComplete, userId });
        return res.status(201).json({ message: "Tarea creada exitosamente", task: newTask });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la tarea", error: error.message });
    }
};

export const allTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las tareas", error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "No se ha encontrado la tarea" });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la tarea por id", error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete, userId } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "title y description son obligatorios" });
        }
        if (title.length > 100 || description.length > 100) {
            return res.status(400).json({ message: "Los campos no pueden superar los 100 caracteres" });
        }
        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({ message: "isComplete debe ser un valor booleano" });
        }
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "No se ha encontrado la tarea" });
        }
        const tituloExistente = await Task.findOne({ where: { title } });
        if (tituloExistente && tituloExistente.id !== task.id) {
            return res.status(400).json({ message: "Ya existe una tarea con ese título" });
        }
        await task.update({ title, description, isComplete, userId });
        return res.status(200).json({ message: "Tarea actualizada exitosamente", task });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "No se ha encontrado la tarea" });
        }
        await task.destroy();
        return res.status(200).json({ message: "Tarea eliminada exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
    }
};
