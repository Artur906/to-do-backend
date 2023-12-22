import { query } from '../db';
import { Task } from '../models/Task';

export const getAll = async (): Promise<Task[] | undefined> => {
  const res = await query('SELECT * FROM tasks');
  return res.rows;
}

export const getById = async (taskId: string): Promise<Task | undefined> => {
  const res = await query("SELECT * FROM tasks t WHERE t.id = $1", [taskId]);
  return res.rows[0]
}