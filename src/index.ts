import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';
import { setupCors } from './helpers';
import { handleError } from './utils/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
setupCors(app);
app.use(express.json());

// Setup all routes and route-specific middleware
setupRoutes(app);

// Error handler middleware (must be last)
app.use(handleError);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

