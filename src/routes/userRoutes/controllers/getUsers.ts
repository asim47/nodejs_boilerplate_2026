import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../../db';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  // Fetch users from database using Prisma
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Prisma returns Date objects, Fastify will serialize them to ISO strings
  return reply.code(200).send({
    success: true,
    data: users,
    count: users.length,
  });
};
