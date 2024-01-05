import { z } from 'zod';

export const getTaskSchema = z.object({
  id: z.string().min(1).uuid(),
  user_id: z.string().uuid(),
  task_name: z.string().max(255),
  priority: z.number().min(1).max(3).optional(),
  completed: z.boolean(),
  created_at: z.string().pipe(z.coerce.date()),
  due_date: z.string().pipe(z.coerce.date()).optional(),
});

export type getTaskDTO = z.infer<typeof getTaskSchema>;

export const createTaskSchema = z.object({
  user_id: z
    .string({ required_error: 'O id do usuário é um campo obrigatório' })
    .uuid('O id deve ser do tipo UUID'),
  task_name: z
    .string({ required_error: 'O nome da tarefa é um campo obrigatório' })
    .max(255, 'Passou o tamanho máximo'),
  priority: z
    .number({ required_error: 'A prioridade da tarefa é um campo obrigatório' })
    .min(1)
    .max(3),
  completed: z.boolean({
    required_error: 'O estado da tarefa é um campo obrigatório',
  }),
  created_at: z
    .string({
      required_error: 'A data de criação da tarefa é um campo obrigatório',
    })
    .pipe(z.coerce.date()),
  due_date: z.string().pipe(z.coerce.date()).optional(),
});

export type createTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  user_id: z.string().uuid('O id deve ser do tipo UUID').optional(),
  task_name: z.string().max(255, 'Passou o tamanho máximo').optional(),
  priority: z.number().min(1).max(3).optional(),
  completed: z.boolean().optional(),
  due_date: z.string().pipe(z.coerce.date()).optional(),
});

export type updateTaskDTO = z.infer<typeof updateTaskSchema>;