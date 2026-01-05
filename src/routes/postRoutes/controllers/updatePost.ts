import { FastifyReply } from 'fastify';
import { UpdatePostInput } from '../../../schemas/postSchemas';
import { prisma } from '../../../db';
import { AuthenticatedRequest } from '../../../middleware/isAuthenticated';
import { HttpError } from '../../../utils/HttpError';

export const updatePost = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  const params = request.params as { id: string };
  const body = request.body as UpdatePostInput;
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
    throw new HttpError(403, 'You can only update your own posts');
  }

  // Update post
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      post: body.post,
    },
  });

  return reply.code(200).send({
    success: true,
    message: 'Post updated successfully',
    data: post,
  });
};
