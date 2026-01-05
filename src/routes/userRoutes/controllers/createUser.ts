import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserInput } from '../../../schemas/userSchemas';
import { prisma } from '../../../db';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const body = request.body; // Already validated by Fastify

  // Create user in database using Prisma
  // Status defaults to 'Active' in the database if not provided
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      ...(body.status && { status: body.status }), // Include status if provided
    },
  });

  // Prisma returns Date objects, Fastify will serialize them to ISO strings
  return reply.code(201).send({
    success: true,
    message: 'User created successfully',
    data: user,
  });
};
