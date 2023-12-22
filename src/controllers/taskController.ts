import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getAll();
  console.log(tasks);
  res.status(200).json(tasks);
}

export const getTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await taskService.getById(taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found!' });
  }

  res.status(200).json(task);
}