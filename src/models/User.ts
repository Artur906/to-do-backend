import { z } from 'zod';

export const getUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string().min(8),
});

export type getUserDTO = z.infer<typeof getUserSchema>;

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type createUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

export type updateUserDTO = z.infer<typeof updateUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type loginUserDTO = z.infer<typeof loginUserSchema>;
