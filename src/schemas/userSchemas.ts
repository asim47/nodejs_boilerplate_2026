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
  email: z.string().email('Invalid email address').optional(),
});

// Response schemas
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
});

export const usersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(userSchema),
  count: z.number(),
});

export const createUserResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: userSchema.extend({
    id: z.union([z.number(), z.string()]), // Allow both number and string for now
  }),
});

// Type exports derived from schemas
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type User = z.infer<typeof userSchema>;
