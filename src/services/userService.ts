import 'dotenv/config';
import { compare } from 'bcrypt';
import { query } from '../db';
import { createUserDTO, getUserDTO, loginUserDTO } from '../models/User';
import { AppError } from '../utils/AppError';
import { hash } from '../utils/passwordHash';
import jwt from 'jsonwebtoken';

export const findByEmail = async (email: string) => {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);

  return res.rows[0];
};

export const register = async ({
  email,
  username,
  password,
}: createUserDTO) => {
  const userBody = {
    email,
    username,
    password_hash: await hash(password).catch(() => {
      throw new AppError('Não foi possível salvar a senha', 400);
    }),
  };

  const userExists = await findByEmail(userBody.email);

  if (userExists) {
    throw new AppError('Email informado já está sendo utilizado', 400);
  }
  const queryString =
    'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *';
  const res = await query(queryString, [
    userBody.email,
    userBody.username,
    userBody.password_hash!,
  ]);

  const response = {
    id: res.rows[0].id,
    username: res.rows[0].username,
    email: res.rows[0].email,
  }

  return response;
};

export const login = async ({ email, password }: loginUserDTO) => {
  const user: getUserDTO = await findByEmail(email);
  if (!user) {
    throw new AppError('Email ou senha inválidos', 400);
  }

  const isValid = await compare(password, user.password_hash);
  if (!isValid) {
    throw new AppError('Email ou senha inválidos', 400);
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY!;

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(userData, jwtSecretKey, {
    expiresIn: 60 * 60, //  1 hour
  });

  return token;
};
