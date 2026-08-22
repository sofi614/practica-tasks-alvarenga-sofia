import {Router} from "express";
import {createUser , allUsers , getUserById , updateUser} from "../controllers/user.controller.js";

const router = Router();

router.post("/users",createUser);
router.get("/users",allUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);


export default router;