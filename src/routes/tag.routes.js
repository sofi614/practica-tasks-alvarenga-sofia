import { Router } from "express";
import { createTag, allTags, updateTag, deleteTag } from "../controllers/tag.controller.js";
import { createTagValidation, updateTagValidation, tagIdValidation } from "../validators/tag.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/tags", createTagValidation, handleValidationErrors, createTag);
router.get("/tags", allTags);
router.put("/tags/:id", updateTagValidation, handleValidationErrors, updateTag);
router.delete("/tags/:id", tagIdValidation, handleValidationErrors, deleteTag);

export default router;