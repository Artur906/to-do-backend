import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod"

export const validate = (schema: ZodSchema) => {
  const validation = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const result = schema.safeParse(body);

    if (!result.success) {
      return next(result.error);
    }


    return next();
  }

  return validation
} 