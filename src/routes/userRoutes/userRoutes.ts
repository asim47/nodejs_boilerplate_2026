import { FastifyInstance } from 'fastify';
import { getUsers } from './controllers/getUsers';
import { createUser } from './controllers/createUser';
import { RouteContext } from '../../types/routeContext';
import {
  createUserSchema,
  usersResponseSchema,
  createUserResponseSchema,
} from '../../schemas/userSchemas';
import { createFastifySchema, withOpenApiMetadata } from '../../utils/swaggerSchemas';
import { z } from 'zod';

function userRoutes(app: FastifyInstance, ctx: RouteContext) {
  // GET /api/users
  app.get(
    '/api/users',
    {
      schema: withOpenApiMetadata(
        createFastifySchema({
          response: {
            200: usersResponseSchema,
          },
        }),
        {
          tags: ['Users'],
          summary: 'Get all users',
          description: 'Retrieve a list of all users',
        }
      ),
    },
    getUsers
  );

  // POST /api/users
  app.post(
    '/api/users',
    {
      schema: withOpenApiMetadata(
        createFastifySchema({
          body: createUserSchema,
          response: {
            201: createUserResponseSchema,
          },
        }),
        {
          tags: ['Users'],
          summary: 'Create a new user',
          description: 'Create a new user with name and email',
        }
      ),
    },
    createUser
  );

  return app;
}

export default userRoutes;
