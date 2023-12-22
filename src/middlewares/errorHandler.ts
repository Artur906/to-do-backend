import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  console.log("helooo")
  let error = { ...err };

  error.message = err.message;

  if (err instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ sucess: false, message: error.message });
  }

  console.error('Unexpected error:', err);

  return res.status(500).json({
    sucess: false,
    error: 'Internal Server Error',
  });
};
