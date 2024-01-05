import { query } from '../db';
import { createTaskDTO, getTaskDTO } from '../models/Task';

export const getAll = async (): Promise<getTaskDTO[] | undefined> => {
	const res = await query('SELECT * FROM tasks');
	return res.rows;
};

export const getById = async (taskId: string): Promise<getTaskDTO | undefined> => {
	const res = await query('SELECT * FROM tasks t WHERE t.id = $1', [taskId]);
	return res.rows[0];
};

export const create = async (task: createTaskDTO): Promise<getTaskDTO | undefined> => {


	const keys = Object.keys(task);
	const values = Object.values(task);

	// Construct placeholders like $1, $2, $3, ...
	const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

	// Construct the column names like column1, column2, ...
	const columns = keys.join(', ');

	const queryString = `INSERT INTO tasks(${columns}) VALUES (${placeholders}) RETURNING *`;



	const res = await query(
		queryString,
		[...values]
	);

	return res.rows[0];
};
