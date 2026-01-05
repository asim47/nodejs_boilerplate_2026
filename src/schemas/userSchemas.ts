import { z } from 'zod';

// User validation schemas
export const getUserParamsSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
});

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.email('Invalid email address').optional(),
});

// Type exports derived from schemas
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

