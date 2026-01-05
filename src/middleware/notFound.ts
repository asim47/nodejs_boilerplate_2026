import { Request, Response } from 'express';
import { HttpError } from '../utils/HttpError';

export function notFoundHandler(req: Request, res: Response): void {
  throw new HttpError(404, `Route ${req.method} ${req.path} not found`);
}

