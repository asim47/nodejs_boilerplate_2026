import { Express, Router } from 'express';
import { getUsers } from './controllers/getUsers';
import { createUser } from './controllers/createUser';
import { RouteContext } from '../../types/routeContext';
import { asyncHandler } from '../../utils/controllerWrapper';

function userRoutes(app: Express, ctx: RouteContext) {
  const router = Router();

  router.get('/', asyncHandler(getUsers));
  router.post('/', asyncHandler(createUser));

  app.use('/api/users', router);
  return app;
}

export default userRoutes;

