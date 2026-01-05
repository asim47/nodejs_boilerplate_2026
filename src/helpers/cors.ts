import { Express } from 'express';
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
];

export function setupCors(app: Express): void {
  const corsOptions = {
    origin: allowedOrigins || '*',
  };

  app.use(cors(corsOptions));
}

