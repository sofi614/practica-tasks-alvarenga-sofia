import { Router } from "express";
import {
	createProfile,
	allProfiles,
	getProfileById,
	updateProfile,
	deleteProfile
} from "../controllers/profile.controller.js";

const router = Router();
router.post("/profiles", createProfile);
router.get("/profiles", allProfiles);
router.get("/profiles/:id", getProfileById);
router.put("/profiles/:id", updateProfile);
router.delete("/profiles/:id", deleteProfile);

export default router;
