import { sign } from "crypto";
import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

// Handle user registration
router.post("/signup", signup);

//   Handle user login
router.post("/login", login);

//   Handle user logout
router.post("/logout", logout);

export default router;
