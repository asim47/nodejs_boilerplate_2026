import { FastifyReply } from 'fastify';
import { prisma } from '../../../db';
import { AuthenticatedRequest } from '../../../middleware/isAuthenticated';
import { HttpError } from '../../../utils/HttpError';

export const getPost = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  const params = request.params as { id: string };
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    throw new HttpError(400, 'Invalid post ID');
  }

  // Find post by ID
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  return reply.code(200).send({
    success: true,
    data: post,
  });
};
