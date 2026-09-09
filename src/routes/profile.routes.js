import { Router } from "express";
import {
	createProfile,
	allProfiles,
	getProfileById,
	updateProfile,
	deleteProfile
} from "../controllers/profile.controller.js";
import {
	createProfileValidation,
	profileIdValidation,
	updateProfileValidation
} from "../validators/profile.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();
router.post("/profiles", createProfileValidation, handleValidationErrors, createProfile);
router.get("/profiles", allProfiles);
router.get("/profiles/:id", profileIdValidation, handleValidationErrors, getProfileById);
router.put("/profiles/:id", updateProfileValidation, handleValidationErrors, updateProfile);
router.delete("/profiles/:id", deleteProfile);

export default router;
