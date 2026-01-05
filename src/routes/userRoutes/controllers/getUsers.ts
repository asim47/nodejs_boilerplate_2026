import { FastifyRequest, FastifyReply } from 'fastify';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  // Dummy user data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdAt: '2024-01-16T14:20:00Z',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      createdAt: '2024-01-17T09:15:00Z',
    },
  ];

  return reply.code(200).send({
    success: true,
    data: users,
    count: users.length,
  });
};
