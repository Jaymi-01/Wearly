import { sign } from "crypto";
import express from "express";
import { signup, login, logout, refreshToken } from "../controllers/authController.js";

const router = express.Router();

// Handle user registration
router.post("/signup", signup);

//   Handle user login
router.post("/login", login);

//   Handle user logout
router.post("/logout", logout);

//   Handle refresh token
router.post("/refresh-token", refreshToken);



export default router;
