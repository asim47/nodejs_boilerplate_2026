import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  // Log request
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Override res.end to log response
  const originalEnd = res.end.bind(res);
  res.end = function (chunk?: any, encoding?: any, cb?: any) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[logLevel](`${req.method} ${req.path} ${statusCode}`, {
      statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });

    return originalEnd(chunk, encoding, cb);
  };

  next();
}

