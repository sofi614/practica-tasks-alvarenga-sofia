import {Router} from "express";
import {createTask , allTasks , getTaskById } from "../controllers/task.controller.js";

const router = Router();

router.post('/tasks', createTask); 
router.get('/tasks', allTasks); 
router.get('/tasks/:id', getTaskById);   

export default router;
