import { Router } from "express";
import { createTag, allTags } from "../controllers/tag.controller.js";
import { createTagValidation } from "../validators/tag.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/tags", createTagValidation, handleValidationErrors, createTag);
router.get("/tags", allTags);

export default router;