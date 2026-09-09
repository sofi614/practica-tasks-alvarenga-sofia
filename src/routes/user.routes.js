import { Router } from "express";
import { createUser, allUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", createUser);
router.get("/users", allUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;