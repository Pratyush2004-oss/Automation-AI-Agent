import express from "express";
import { login, logout, me } from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.get("/me", isAuth, me);
router.get("/logout", logout);

export default router;