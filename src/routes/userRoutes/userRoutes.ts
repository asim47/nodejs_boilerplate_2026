import { Express, Router } from 'express';
import { getUsers } from './controllers/userController';
import { RouteContext } from '../../types/routeContext';

function userRoutes(app: Express, ctx: RouteContext) {
  const router = Router();

  router.get('/', getUsers);

  app.use('/api/users', router);
  return app;
}

export default userRoutes;

