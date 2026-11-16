import express from "express";
import { isAuth } from "../middleware/auth.middleware.js";
import { createAgent, deleteAgent, getAgentById, getAllAgents } from "../controllers/agent.controller.js";
const router = express.Router();

router.post("/create", isAuth, createAgent);
router.get("/", isAuth, getAllAgents);
router.get("/:id", isAuth, getAgentById);
router.delete("/:id", isAuth, deleteAgent);

export default router;