import { Router } from "express";
import { createTask, allTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";
import { createTaskValidation, updateTaskValidation } from "../validators/task.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/tasks", createTaskValidation, handleValidationErrors, createTask);
router.get("/tasks", allTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTaskValidation, handleValidationErrors, updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
