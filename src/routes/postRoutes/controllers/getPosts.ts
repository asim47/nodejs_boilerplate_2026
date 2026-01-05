import { FastifyReply } from 'fastify';
import { prisma } from '../../../db';
import { AuthenticatedRequest } from '../../../middleware/isAuthenticated';

export const getPosts = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  // Fetch all posts from database using Prisma
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reply.code(200).send({
    success: true,
    data: posts,
    count: posts.length,
  });
};
