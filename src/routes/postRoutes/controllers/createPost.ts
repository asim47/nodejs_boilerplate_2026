import { FastifyReply } from 'fastify';
import { CreatePostInput } from '../../../schemas/postSchemas';
import { prisma } from '../../../db';
import { AuthenticatedRequest } from '../../../middleware/isAuthenticated';

export const createPost = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  const body = request.body as CreatePostInput;
  const userId = request.user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  // Create post in database using Prisma
  const post = await prisma.post.create({
    data: {
      userId,
      post: body.post,
    },
  });

  return reply.code(201).send({
    success: true,
    message: 'Post created successfully',
    data: post,
  });
};
