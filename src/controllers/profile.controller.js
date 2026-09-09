import { Profile, User } from "../models/relaciones.js";

const profileAttributes = ["id", "bio", "phoneNumber", "userId"];

export const createProfile = async (req, res) => {
    try {
        const { bio, phoneNumber, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "userId es obligatorio" });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (await Profile.findOne({ where: { userId } })) {
            return res.status(400).json({ message: "El usuario ya tiene un perfil" });
        }
        if (phoneNumber && await Profile.findOne({ where: { phoneNumber } })) {
            return res.status(400).json({ message: "El número de teléfono ya está registrado" });
        }
        const profile = await Profile.create({ bio, phoneNumber, userId });
        return res.status(201).json({ message: "Perfil creado exitosamente", profile });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el perfil", error: error.message });
    }
};

export const allProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll({
            attributes: profileAttributes,
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
        });
        return res.status(200).json(profiles);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener perfiles", error: error.message });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id, {
            attributes: profileAttributes,
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
        });
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }
        const { bio, phoneNumber, userId } = req.body;
        if (userId && userId !== profile.userId) {
            if (!await User.findByPk(userId)) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            const profileForUser = await Profile.findOne({ where: { userId } });
            if (profileForUser && profileForUser.id !== profile.id) {
                return res.status(400).json({ message: "El usuario ya tiene un perfil" });
            }
        }
        if (phoneNumber) {
            const profileForPhone = await Profile.findOne({ where: { phoneNumber } });
            if (profileForPhone && profileForPhone.id !== profile.id) {
                return res.status(400).json({ message: "El número de teléfono ya está registrado" });
            }
        }
        await profile.update({ bio, phoneNumber, userId });
        return res.status(200).json({ message: "Perfil actualizado exitosamente", profile });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }
        await profile.destroy();
        return res.status(200).json({ message: "Perfil eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el perfil", error: error.message });
    }
};