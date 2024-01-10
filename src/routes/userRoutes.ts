import { Router } from "express";
import * as userController from "../controllers/userController";
import { validate } from "../utils/validateSchema";
import { createUserSchema } from "../models/User";

export const router = Router();

router.post("/user", validate(createUserSchema), userController.createUser)