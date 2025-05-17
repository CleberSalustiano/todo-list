import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (!(err instanceof AppError)) {
    console.error('Erro:', err);
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor';

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}
