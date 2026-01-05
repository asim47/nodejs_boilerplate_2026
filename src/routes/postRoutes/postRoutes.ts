import { FastifyInstance } from 'fastify';
import { RouteContext } from '../../types/routeContext';
import { getPosts } from './controllers/getPosts';
import { getPost } from './controllers/getPost';
import { createPost } from './controllers/createPost';
import { updatePost } from './controllers/updatePost';
import { deletePost } from './controllers/deletePost';
import {
  createPostSchema,
  updatePostSchema,
  getPostParamsSchema,
  postsResponseSchema,
  postResponseSchema,
  createPostResponseSchema,
  updatePostResponseSchema,
  deletePostResponseSchema,
} from '../../schemas/postSchemas';
import { createFastifySchema, withOpenApiMetadata } from '../../utils/swaggerSchemas';
import { isAuthenticated } from '../../middleware/isAuthenticated';

function postRoutes(app: FastifyInstance, _ctx: RouteContext) {
  // GET /api/posts (protected) - Get all posts
  app.get(
    '/api/posts',
    {
      preHandler: [isAuthenticated],
      schema: withOpenApiMetadata(
        createFastifySchema({
          response: {
            200: postsResponseSchema,
          },
        }),
        {
          tags: ['Posts'],
          summary: 'Get all posts',
          description: 'Retrieve a list of all posts (requires authentication)',
          security: [{ bearerAuth: [] }],
        }
      ),
    },
    getPosts
  );

  // GET /api/posts/:id (protected) - Get a single post
  app.get(
    '/api/posts/:id',
    {
      preHandler: [isAuthenticated],
      schema: withOpenApiMetadata(
        createFastifySchema({
          params: getPostParamsSchema,
          response: {
            200: postResponseSchema,
          },
        }),
        {
          tags: ['Posts'],
          summary: 'Get a post by ID',
          description: 'Retrieve a specific post by its ID (requires authentication)',
          security: [{ bearerAuth: [] }],
        }
      ),
    },
    getPost
  );

  // POST /api/posts (protected) - Create a new post
  app.post(
    '/api/posts',
    {
      preHandler: [isAuthenticated],
      schema: withOpenApiMetadata(
        createFastifySchema({
          body: createPostSchema,
          response: {
            201: createPostResponseSchema,
          },
        }),
        {
          tags: ['Posts'],
          summary: 'Create a new post',
          description: 'Create a new post (requires authentication)',
          security: [{ bearerAuth: [] }],
        }
      ),
    },
    createPost
  );

  // PUT /api/posts/:id (protected) - Update a post
  app.put(
    '/api/posts/:id',
    {
      preHandler: [isAuthenticated],
      schema: withOpenApiMetadata(
        createFastifySchema({
          params: getPostParamsSchema,
          body: updatePostSchema,
          response: {
            200: updatePostResponseSchema,
          },
        }),
        {
          tags: ['Posts'],
          summary: 'Update a post',
          description: 'Update an existing post (requires authentication, only own posts)',
          security: [{ bearerAuth: [] }],
        }
      ),
    },
    updatePost
  );

  // DELETE /api/posts/:id (protected) - Delete a post
  app.delete(
    '/api/posts/:id',
    {
      preHandler: [isAuthenticated],
      schema: withOpenApiMetadata(
        createFastifySchema({
          params: getPostParamsSchema,
          response: {
            200: deletePostResponseSchema,
          },
        }),
        {
          tags: ['Posts'],
          summary: 'Delete a post',
          description: 'Delete a post (requires authentication, only own posts)',
          security: [{ bearerAuth: [] }],
        }
      ),
    },
    deletePost
  );

  return app;
}

export default postRoutes;
