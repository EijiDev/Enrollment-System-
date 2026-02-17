import express from "express";
import { login, registerStudent, logout, getCurrentUser } from "../controller/auth.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register/student", registerStudent);


router.post("/logout", verifyAuth, logout);
router.get("/me", verifyAuth, getCurrentUser);

export default router;