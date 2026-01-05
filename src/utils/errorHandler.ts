import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HttpError } from './HttpError';
import { logger } from './logger';

export function handleError(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Zod validation error
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    logger.warn('Validation error', {
      path: req.path,
      method: req.method,
      errors,
    });

    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
    return;
  }

  // HttpError (custom error)
  if (error instanceof HttpError) {
    logger.error(`HTTP Error ${error.statusCode}`, error, {
      path: req.path,
      method: req.method,
    });

    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  // Generic Error
  if (error instanceof Error) {
    logger.error('Unhandled error', error, {
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error.message,
    });
    return;
  }

  // Unknown error
  logger.error('Unknown error', error, {
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

