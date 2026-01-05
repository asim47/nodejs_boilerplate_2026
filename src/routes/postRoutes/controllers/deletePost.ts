import { FastifyReply } from 'fastify';
import { prisma } from '../../../db';
import { AuthenticatedRequest } from '../../../middleware/isAuthenticated';
import { HttpError } from '../../../utils/HttpError';

export const deletePost = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  const params = request.params as { id: string };
  const postId = parseInt(params.id, 10);
  const userId = request.user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  if (isNaN(postId)) {
    throw new HttpError(400, 'Invalid post ID');
  }

  // Check if post exists and belongs to user
  const existingPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!existingPost) {
    throw new HttpError(404, 'Post not found');
  }

  if (existingPost.userId !== userId) {
    throw new HttpError(403, 'You can only delete your own posts');
  }

  // Delete post
  await prisma.post.delete({
    where: { id: postId },
  });

  return reply.code(200).send({
    success: true,
    message: 'Post deleted successfully',
  });
};
