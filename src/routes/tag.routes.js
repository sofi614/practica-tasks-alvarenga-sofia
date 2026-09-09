import { Router } from "express";
import { createTag, allTags } from "../controllers/tag.controller.js";

const router = Router();

router.post("/tags", createTag);
router.get("/tags", allTags);

export default router;