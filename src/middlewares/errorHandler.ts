import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ sucess: false, message: err.message });
  }

  if (err instanceof ZodError) {
    const { errors: zodErrors } = err;

    const validationErrors = zodErrors.reduce((prev, next) => {
      return { ...prev, [next.path[0]]: next.message };
    }, {});

    return res.status(400).json({
      sucess: false,
      message: 'Ocorreu um erro de validação',
      error: validationErrors,
    });
  }

  console.error('Unexpected error:', err);

  return res.status(500).json({
    sucess: false,
    error: 'Internal Server Error',
  });
};
