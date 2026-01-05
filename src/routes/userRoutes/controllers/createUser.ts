import { Request, Response } from 'express';
import { createUserSchema } from '../../../schemas/userSchemas';
import { HttpError } from '../../../utils';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  // Validate request body with Zod schema
  
  
  const validatedData = createUserSchema.parse(req.body);



  // TODO: Create user in database
  // const user = await userService.create(validatedData);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      id: 999, // Mock ID
      ...validatedData,
      createdAt: new Date().toISOString(),
    },
  });
};

