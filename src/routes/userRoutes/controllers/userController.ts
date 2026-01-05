import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
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

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

