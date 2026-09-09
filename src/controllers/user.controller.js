import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email y password son obligatorios" });
        }
        if (name.length > 100 || email.length > 100 || password.length > 100) {
            return res.status(400).json({ message: "Los campos no pueden superar los 100 caracteres" });
        }
        const emailExistente = await User.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(400).json({ message: "Ya existe un usuario con ese email" });
        }
        const newUser = await User.create({ name, email, password });
        return res.status(201).json({ message: "Usuario creado con éxito", user: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};

export const allUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "No se ha encontrado el usuario" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuario por ID", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email y password son obligatorios" });
        }
        if (name.length > 100 || email.length > 100 || password.length > 100) {
            return res.status(400).json({ message: "Los campos no pueden superar los 100 caracteres" });
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "No se ha encontrado el usuario" });
        }
        const emailExistente = await User.findOne({ where: { email } });
        if (emailExistente && emailExistente.id !== user.id) {
            return res.status(400).json({ message: "Ya existe un usuario con ese email" });
        }
        await user.update({ name, email, password });
        return res.status(200).json({ message: "Usuario actualizado exitosamente", user });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No se ha encontrado el usuario" });
        }
        await user.destroy();
        return res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
};
