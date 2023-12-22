import { Router } from "express";
import * as taskController from "../controllers/taskController";

export const router = Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:taskId', taskController.getTaskById);