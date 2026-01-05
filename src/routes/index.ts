import { Express, Request, Response } from 'express';
import userRoutes from './userRoutes/userRoutes';
import healthRoutes from './healthRoutes/healthRoutes';
import { RouteContext } from '../types/routeContext';
import { setupFileUpload } from '../helpers';

export function setupRoutes(app: Express): Express {
  // Middleware
  setupFileUpload(app);

  // Routes
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to the API!',
      timestamp: new Date().toISOString(),
    });
  });

  // Route context (can be extended with services, database, etc.)
  const ctx: RouteContext = {};

  // API Routes
  healthRoutes(app, ctx);
  userRoutes(app, ctx);

  return app;
}

