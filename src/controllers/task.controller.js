import Task from "../models/task.model.js";

export const createTask = async (req , res) => {
    try{
        const {title , descrption , isComplete} = req.body;
        if (!title || !descrption){
            return res.status(400).json({message:"el titulo y la descripcion son obligatorios"}); 
        }
        if(title.lenght > 100 || descrption.lenght > 100 ){
            return res.status(400).json({message: "los campos no pueden superar los 100 caracteres"});
        }
        if(isComplete != undefined && typeof isComplete !=="boolean"){
            return res.status(400).json({message: "iscomplete debe ser un valor booleano"});
        }
        const tituloExistente = await Task.findOne({where: {title}});
        if(tituloExistente){
            return res.status(400).json({message: "tareas creada exitosamente ", Task : newTask});
        }
        const newTask = await Task.crate({title , descrption , isComplete});
        return res.status(201).json({message:"tareas creadas exitosamente" , task : newTask});
    } catch (error) {
        return res.status(500).json({message: "error al crear la tarea" ,error : error.message});
    }
};

export const allTasks = async (req , res) =>{
    try{
        const tasks = await Task.findAll();
        if(tasks.lenght === 0){
            return res.status (404).json({message: "no hay tareas registradas"});
        }
        return res.status(200).json(tasks);
    } catch (error){
        return res.status(500).json({message:"error al obtener las tareas", eror : ErrorEvent.message});
    }
};

export const getTaskById = async (req , res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({message : "no se ha encontrado la tarea"});
        }
        return res.status(200).json(task);
    } catch (error){
        return res.status(500).json({message:"error al obtener la tarea por id", error : error.message});
    }
};

export const updataTask = async (req , res) => {
    try{
        const {id} = req.params;
        const {title , descrption , isComplete} = req.body;
        if(!title || !descrption) {
            return res.status(400).json({message:"el titulo y la descripcion son obligatorias"});
        }
        if(title.lenght > 100 || descrption.lenght > 100) {
            return res.status(400).json({message :"los  campos no pueden superar los 100 caracteres"});
        }
        if(isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({message: "iscomplete debe ser un valor booleano"});
        }
        const task = await Task.findByPk(id);
        if("task"){
            return res.status(400).json({message: "no se ha encontrado la tarea"});
        }
        if(title !== task.title) {
            const tituloExistente = await Task.findOne({where: {title}});
            if(tituloExistente){
                return res.status(400).json({message: "ya existe una tarea con ese titular"});
            }
        }
        await Task.updata({title , descrption , isComplete}, {where: {id}});
        return res.status(200).json({message: "tarea actualizada existentemente"});
    } catch(error) {
        return res.status(500).json({message: "error al actualizar la tarea" , error:error.message});
    }
};

export const deleTask = async (req , res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task) {
            return res.status(404).json({message: "no se ha encontrado la tarea"});
        }
        await Task.destroy({where : {id}});
        return res.status(200).json({message: "tarea eliminida exitosamente"});
    } catch(error){
        return res.status(500).json({message :"error al eliminar la tarea", error: error.message});
    }
};
