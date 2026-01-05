import { Express, Router } from 'express';
import { getHealth } from './controllers/healthController';
import { RouteContext } from '../../types/routeContext';
import { asyncHandler } from '../../utils/controllerWrapper';

function healthRoutes(app: Express, ctx: RouteContext) {
  const router = Router();

  router.get('/', asyncHandler(getHealth));

  app.use('/health', router);
  return app;
}

export default healthRoutes;

