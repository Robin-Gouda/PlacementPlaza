import { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../Middleware/AuthValidation.js";
import { login, signup } from "../Controllers/AuthController.js";

const router = Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

export default router;
