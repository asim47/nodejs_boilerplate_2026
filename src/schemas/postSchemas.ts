import { z } from 'zod';

// Post validation schemas
export const createPostSchema = z.object({
  post: z.string().min(1, 'Post content is required'),
});

export const updatePostSchema = z.object({
  post: z.string().min(1, 'Post content is required').optional(),
});

export const getPostParamsSchema = z.object({
  id: z.string().min(1, 'Post ID is required'),
});

// Post response schema (matches Prisma Post model)
export const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  post: z.string(),
  createdAt: z.string(), // ISO 8601 datetime string
  updatedAt: z.string(), // ISO 8601 datetime string
});

// Response schemas
export const postsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(postSchema),
  count: z.number(),
});

export const postResponseSchema = z.object({
  success: z.boolean(),
  data: postSchema,
});

export const createPostResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: postSchema,
});

export const updatePostResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: postSchema,
});

export const deletePostResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Type exports
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type GetPostParams = z.infer<typeof getPostParamsSchema>;
export type Post = z.infer<typeof postSchema>;
