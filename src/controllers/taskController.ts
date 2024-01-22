import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/taskService";
import { AppError } from "../utils/AppError";
import { createTaskDTO, updateTaskDTO } from "../models/Task";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.body;
    const tasks = await taskService.getAll(user_id);
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error: any) {
    next(error)
  }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { user_id } = req.body;
    const task = await taskService.getById(taskId, user_id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json(task);

  } catch (error: any) {
    next(error);
  }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskBody: createTaskDTO = req.body;
    const task = await taskService.create(taskBody);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(201).json(task);

  } catch (error: any) {
    next(error);
  }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskBody: updateTaskDTO = req.body;
    const { taskId } = req.params;
    const task = await taskService.update(taskId, taskBody);

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(201).json(task);

  } catch (error: any) {
    next(error);
  }
}