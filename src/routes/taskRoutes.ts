import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validate } from "../utils/validateSchema";
import { createTaskSchema, updateTaskSchema } from "../models/Task";

export const router = Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:taskId', taskController.getTaskById);
router.post('/tasks', validate(createTaskSchema), taskController.createTask);
router.put('/tasks/:taskId', validate(updateTaskSchema), taskController.updateTask);