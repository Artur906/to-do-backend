import { object } from 'zod';
import { query } from '../db';
import { createTaskDTO, getTaskDTO, updateTaskDTO } from '../models/Task';

export const getAll = async (userId: string): Promise<getTaskDTO[] | undefined> => {
	const res = await query('SELECT * FROM tasks t WHERE t.user_id = $1', [userId]);
	return res.rows;
};

export const getById = async (
	taskId: string,
	userId: string
): Promise<getTaskDTO | undefined> => {
	const res = await query('SELECT * FROM tasks t WHERE t.id = $1 AND t.user_id = $2', [taskId, userId]);
	return res.rows[0];
};

export const create = async (
	task: createTaskDTO
): Promise<getTaskDTO | undefined> => {

	const keys = Object.keys(task);
	const values = Object.values(task).map((item) => item.toString());

	// Construct placeholders like $1, $2, $3, ...
	const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

	// Construct the column names like column1, column2, ...
	const columns = keys.join(', ');

	const queryString = `INSERT INTO tasks(${columns}) VALUES (${placeholders}) RETURNING *`;

	const res = await query(queryString, [...values]);

	return res.rows[0];
};

export const update = async (
	taskId: string,
	task: updateTaskDTO
): Promise<getTaskDTO | undefined> => {
	const keys = Object.keys(task);
	const values = Object.values(task).map((item) => item.toString());

	// Construct placeholders like $1, $2, $3, ...
	const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

	// Construct the column names like column1, column2, ...
	const columns = keys.join(', ');

	const columnsAndValues =
		keys.length > 1
			? `(${columns}) = (${placeholders})`
			: `${columns} = ${placeholders}`;

	const queryString = `UPDATE tasks t SET ${columnsAndValues} WHERE t.id = $${keys.length + 1
		} AND t.user_id = $${keys.length + 2} RETURNING *`;

	const res = await query(queryString, [...values, taskId, task.user_id!]);

	return res.rows[0];
};
