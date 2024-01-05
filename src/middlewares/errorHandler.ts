import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

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

  console.error('Unexpected error:', err);

  return res.status(500).json({
    sucess: false,
    error: 'Internal Server Error',
  });
};
