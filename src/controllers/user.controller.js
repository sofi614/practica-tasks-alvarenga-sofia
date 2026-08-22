import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try{
        const {name , email , password } = req.body ;
        if(!name || !email || !password) {
            return res.status(400).json({message: "todos los campos son obligatorios"});
        }
        if(name.lenght > 100 || email.lenght > 100 || password.lenght > 100){
            return res.status(400).json({message: "los campos no pueden superar los 100"});
        }
        const emailExistente = await User.findOne({where : {email}});
        if(emailExistente) {
            return res.status(400).json({message:"ya existe un usuario con ese email"});
        }
        const newUser = await User.create({ name , email, password});
        return res.status(201).json({message:"usuario creado con exito" , user: newUser});

    } catch (error){
        return res.status(500).json({message: "error al crear el usuario" , error: error.message});
    }
};

export const allUsers = async (req , res) => {
    try{
        const users = await User.findAll();
        if (users.lenght === 0){
            return res.status(404).json({message: "no hay usuarios requeridos"});
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: "error al obtener los usuarios", error : error.message});
    }
};

export const getUserById = async (req , res) => {
    try{
        const { id } = req.params;
        const user = await User.findByPk(id); 
        if(!user){
            return res.status(400).json({message: "no se ha encontrado el usuario"}); 
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "error al obtener usuario por ID" , error: error.message});
    }
};

export const updateUser = async (req , res) => {
    try {
        const {id} = req.params;
        const {name , email, password} = req.body; 
        if (!name || !email || !password) {
            return res.status(400).json({message: "todos los campos son obligatorios"});
        }
        if (name.lenght > 100 || email.lenght > 100 || password.lenght > 100) {
            return res.status(400).json ({message: "los campos no pueden superar los 100 caracteres"});
        }
        const user = await User.findByPk(id);
        if (!user){
            return res.status(404).json({message : "no se ha encontrado el usuario "});
        }
        if (email !== user.email){
            const emailExistente = await User.findOne({where: {email}});
            if (emailExistente){
                return res.status(400).json({message: "ya existe un usuario con ese email"});
            } 
        }
        await User .updateUser({name,email,password}, {where : {id}});
        return res.status(200).json({message:"usuario actializado existosamente "});
    } catch (error) {
        return res.status(500).json({message: "error al actualizar el usuaario", error: error.message});
    }
};
