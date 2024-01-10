import { query } from '../db';
import { createUserDTO } from '../models/User';
import { AppError } from '../utils/AppError';
import { hash } from '../utils/passwordHash';

export const create = async ({ email, username, password }: createUserDTO) => {
  const userBody = {
    email,
    username,
    password_hash: await hash(password).catch(() => {
      throw new AppError('Não foi possível salvar a senha', 400);
    }),
  };

  const queryString = "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *"
  const res = await query(queryString, [userBody.email, userBody.username, userBody.password_hash!])

  return res.rows[0]
};

create({ email: "arturdantasrodrigues@gmail.com", username: "arturdantas", password: "cosalegal" })
