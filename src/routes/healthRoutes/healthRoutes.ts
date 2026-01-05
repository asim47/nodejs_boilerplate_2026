import { Express, Router } from 'express';
import { getHealth } from './controllers/healthController';
import { RouteContext } from '../../types/routeContext';

function healthRoutes(app: Express, ctx: RouteContext) {
  const router = Router();

  router.get('/', getHealth);

  app.use('/health', router);
  return app;
}

export default healthRoutes;

