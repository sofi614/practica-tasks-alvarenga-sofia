import { Router } from "express";
import { createUser, allUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { createUserValidation, updateUserValidation } from "../validators/user.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/users", createUserValidation, handleValidationErrors, createUser);
router.get("/users", allUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserValidation, handleValidationErrors, updateUser);
router.delete("/users/:id", deleteUser);


export default router;