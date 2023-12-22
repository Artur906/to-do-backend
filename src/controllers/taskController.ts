import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/taskService";
import { AppError } from "../utils/AppError";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAll();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error: any) {
    next(error)
  }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.getById(taskId);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json(task);

  } catch (error: any) {
    next(error);
  }
}