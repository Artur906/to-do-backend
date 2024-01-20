import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validate } from "../utils/validateSchema";
import { createTaskSchema, updateTaskSchema } from "../models/Task";
import { authHandler } from "../middlewares/authHandler";

export const router = Router();

router.get('/tasks', authHandler, taskController.getAllTasks);
router.get('/tasks/:taskId', authHandler, taskController.getTaskById);
router.post('/tasks', authHandler, validate(createTaskSchema), taskController.createTask);
router.put('/tasks/:taskId', authHandler, validate(updateTaskSchema), taskController.updateTask);