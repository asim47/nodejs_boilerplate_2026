import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserInput, createUserSchema } from '../../../schemas/userSchemas';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {

  const validatedBody = createUserSchema.parse(request.body);
  const body = validatedBody; // Already validated by Fastify

  // TODO: Create user in database
  // const user = await userService.create(body);

  return reply.code(201).send({
    success: true,
    message: 'User created successfully',
    data: {
      id: 999, // Mock ID
      ...body,
      createdAt: new Date().toISOString(),
    },
  });
};
