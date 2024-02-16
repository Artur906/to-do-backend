import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"
import { AppError } from "./AppError";

export const validate = (schema: ZodSchema) => {
  const validation = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const result = schema.safeParse(body);

    if (!result.success) {
      return next(result.error);
    }

    // garantir que o usuário não pode passar valores que não estão no schema
    const invalidFields = []

    for (let key in body) {
      if (!Object.keys(result.data).includes(key)) invalidFields.push(key)
    }

    if (invalidFields.length > 0) {
      next(new AppError("campos inválidos: " + invalidFields.join(', '), 400))
    }

    req.body = result.data;

    return next();
  }

  return validation
} 