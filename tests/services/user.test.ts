import {
  register as registerUser,
  login,
} from '../../src/services/userService';
import * as dbOperations from '../../src/db';
import { QueryResult } from 'pg';
import { AppError } from '../../src/utils/AppError';
import { hashSync } from 'bcrypt';

jest.mock('../../src/db');

// Define the type for the mock function
const mockQuery = dbOperations.query as jest.MockedFunction<
  typeof dbOperations.query
>;

const originalEnv = process.env;

describe('User Tests', () => {
  beforeEach(() => {
    mockQuery.mockReset();
    process.env = {
      ...originalEnv,
      JWT_SECRET_KEY: 'testEnvironment',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should create valid user', async () => {
    const newUser = {
      email: 'oi@gmail.com',
      username: 'oi pessoal',
      password: 'supersenha',
    };

    mockQuery
      .mockResolvedValueOnce({ rows: [] } as unknown as QueryResult<any>)
      .mockResolvedValueOnce({
        rows: [{ ...newUser, id: 'id super coisado' }],
      } as unknown as QueryResult<any>);

    const response = await registerUser(newUser);
    expect(response).toHaveProperty('id');
    expect(response).not.toHaveProperty('password');
  });

  test('should not create user with email thats already registered', async () => {
    const newUser = {
      email: 'oi@gmail.com',
      username: 'oi pessoal',
      password: 'supersenha',
    };

    mockQuery
      .mockResolvedValueOnce({
        rows: [{ ...newUser, id: 'uuid' }],
      } as unknown as QueryResult<any>)
      .mockResolvedValueOnce({
        rows: [{ ...newUser, id: 'id super coisado' }],
      } as unknown as QueryResult<any>);

    try {
      await registerUser(newUser);

      throw new Error('Expected a error to be thrown');
    } catch (error: any) {
      expect(error instanceof AppError).toBe(true);
      expect(error.message).toBe('Email informado já está sendo utilizado');
    }
  });

  test('should return a jwt token when valid user login', async () => {
    const mockUser = {
      email: 'oi@gmail.com',
      username: 'oi pessoal',
      password_hash: hashSync('supersenha', 7),
    };
    const loginData = {
      email: 'oi@gmail.com',
      password: 'supersenha',
    };

    mockQuery.mockResolvedValueOnce({
      rows: [{ ...mockUser, id: 'uuid' }],
    } as unknown as QueryResult<any>);

    const response = await login(loginData);
    expect(response).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
  });

  test('should thrown error when user pass a invalid password', async () => {
    const mockUser = {
      email: 'oi@gmail.com',
      username: 'oi pessoal',
      password_hash: hashSync('supersenha', 7),
    };
    const loginData = {
      email: 'oi@gmail.com',
      password: 'senhaerrada',
    };

    mockQuery.mockResolvedValueOnce({
      rows: [{ ...mockUser, id: 'uuid' }],
    } as unknown as QueryResult<any>);

    try {
      await login(loginData);

      throw new Error('Expected a error to be thrown');
    } catch (error: any) {
      expect(error.message).toBe('Email ou senha inválidos');
    }
  });

  test('should thrown error when user pass a invalid email', async () => {
    const loginData = {
      email: 'oi@gmail.com',
      password: 'senhaerrada',
    };

    mockQuery.mockResolvedValueOnce({
      rows: [],
    } as unknown as QueryResult<any>);

    try {
      await login(loginData);

      throw new Error('Expected a error to be thrown');
    } catch (error: any) {
      expect(error.message).toBe('Email ou senha inválidos');
    }
  });
});
