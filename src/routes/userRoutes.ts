import { Router } from "express";
import * as userController from "../controllers/userController";
import { validate } from "../utils/validateSchema";
import { createUserSchema, loginUserSchema } from "../models/User";

export const router = Router();

router.post("/user/register", validate(createUserSchema), userController.registerUser);
router.post("/user/login", validate(loginUserSchema), userController.loginUser);