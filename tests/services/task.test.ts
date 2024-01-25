import { QueryResult } from 'pg';
import {
  createTaskDTO,
  getTaskDTO,
  updateTaskDTO,
} from '../../src/models/Task';
import * as dbOperations from '../../src/db';
import { create, getAll, getById, update } from '../../src/services/taskService';

jest.mock('../../src/db');

// Define the type for the mock function
const mockQuery = dbOperations.query as jest.MockedFunction<
  typeof dbOperations.query
>;

const originalEnv = process.env;

describe('Task Tests', () => {
  beforeEach(() => {
    mockQuery.mockReset();
    // process.env = {
    //   ...originalEnv,
    //   JWT_SECRET_KEY: 'testEnvironment',
    // };
  });

  // afterEach(() => {
  //   process.env = originalEnv;
  // });

  test('should successfully create query to get all tasks', async () => {
    const userTasks: getTaskDTO[] = [
      {
        id: 'idTask01',
        user_id: 'userID123',
        task_name: 'Test case1',
        completed: false,
        created_at: '2023-12-17T03:24:00',
        due_date: undefined,
        priority: 3,
      },
      {
        id: 'idTask02',
        user_id: 'userID123',
        task_name: 'Test case2',
        completed: false,
        created_at: '2023-12-17T03:24:00',
        due_date: undefined,
        priority: 3,
      },
      {
        id: 'idTask03',
        user_id: 'userID123',
        task_name: 'Test case3',
        completed: false,
        created_at: '2023-12-17T03:24:00',
        due_date: undefined,
        priority: 3,
      },
    ];

    const userId = 'userId';
    mockQuery.mockResolvedValue({
      rows: userTasks,
    } as QueryResult<any>);

    const response = await getAll(userId);

    expect(mockQuery.mock.calls[0][0]).toBe('SELECT * FROM tasks t WHERE t.user_id = $1');
    expect(response?.length).toBe(3);
  });

  test('should successfully create a query to get the correct task', async () => {
    const userTask: getTaskDTO = {
      id: 'idTask01',
      user_id: 'userID123',
      task_name: 'Test case1',
      completed: false,
      created_at: '2023-12-17T03:24:00',
      due_date: undefined,
      priority: 3,
    };

    const taskId = 'idTask01';

    const userId = 'userId';
    mockQuery.mockResolvedValue({
      rows: [userTask],
    } as QueryResult<any>);

    const response = await getById(taskId, userId);

    expect(mockQuery.mock.calls[0][0]).toBe('SELECT * FROM tasks t WHERE t.id = $1 AND t.user_id = $2');
    expect(response).toHaveProperty('id');
  });
  test('should successfully create a query to add a new task', async () => {
    const newTask: createTaskDTO = {
      user_id: 'userID123',
      task_name: 'Test case',
      completed: false,
      created_at: '2023-12-17T03:24:00',
      priority: 3,
    };
    mockQuery.mockResolvedValue({
      rows: [{ ...newTask, id: 'taskUUID1234' }],
    } as QueryResult<any>);

    const response = await create(newTask);

    expect(mockQuery.mock.calls[0][0]).toBe('INSERT INTO tasks(user_id, task_name, completed, created_at, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *')
    expect(response).toHaveProperty('id');
  });

  test('should sucessfully create a query to update the task when user passes many parameters', async () => {
    const newTaskData: updateTaskDTO = {
      user_id: 'userID123',
      task_name: 'Test case',
      priority: 3,
    };
    const taskId = 'taskId';
    mockQuery.mockResolvedValue({
      rows: [{ ...newTaskData, created_at: '2023-12-17T03:24:00', id: taskId }],
    } as QueryResult<any>);

    const response = await update(taskId, newTaskData);

    expect(mockQuery.mock.calls[0][0]).toBe('UPDATE tasks t SET (user_id, task_name, priority) = ($1, $2, $3) WHERE t.id = $4 AND t.user_id = $5 RETURNING *')
    expect(response).toHaveProperty('id');
  });

  test('should sucessfully create a query to update the task when user passes only one parameter', async () => {
    const newTaskData: updateTaskDTO = {
      user_id: 'userID123'
    };
    const taskId = 'taskId';
    mockQuery.mockResolvedValue({
      rows: [{ ...newTaskData, created_at: '2023-12-17T03:24:00', id: taskId }],
    } as QueryResult<any>);

    const response = await update(taskId, newTaskData);

    expect(mockQuery.mock.calls[0][0]).toBe('UPDATE tasks t SET user_id = $1 WHERE t.id = $2 AND t.user_id = $3 RETURNING *')
    expect(response).toHaveProperty('id');
  });
});
