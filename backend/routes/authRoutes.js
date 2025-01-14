import express from "express"
import { login, logout, register } from "../controllers/authController.js";
export const authRouter = express.Router();


authRouter.post('/auth/login', login);
authRouter.post('/auth/register', register);
authRouter.post('/auth/logout', logout);

