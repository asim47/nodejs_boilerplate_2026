import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { HttpError } from './HttpError';
import { logger } from './logger';

export async function errorHandler(
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // Zod validation error
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    logger.warn('Validation error', {
      path: request.url,
      method: request.method,
      errors,
    });

    await reply.code(400).send({
      success: false,
      message: 'Validation error',
      errors,
    });
    return;
  }

  // HttpError (custom error)
  if (error instanceof HttpError) {
    logger.error(`HTTP Error ${error.statusCode}`, error, {
      path: request.url,
      method: request.method,
    });

    await reply.code(error.statusCode).send({
      success: false,
      message: error.message,
    });
    return;
  }

  // Fastify validation error
  if ((error as any).validation) {
    logger.warn('Fastify validation error', {
      path: request.url,
      method: request.method,
      validation: (error as any).validation,
    });

    await reply.code(400).send({
      success: false,
      message: 'Validation error',
      errors: (error as any).validation,
    });
    return;
  }

  // Generic Error
  if (error instanceof Error) {
    logger.error('Unhandled error', error, {
      path: request.url,
      method: request.method,
    });

    await reply.code(500).send({
      success: false,
      message: process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message,
    });
    return;
  }

  // Unknown error
  logger.error('Unknown error', error, {
    path: request.url,
    method: request.method,
  });

  await reply.code(500).send({
    success: false,
    message: 'Internal server error',
  });
}
