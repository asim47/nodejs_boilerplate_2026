import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';
import { setupCors, setupSecurity, setupRateLimit } from './helpers';
import { requestLogger } from './middleware/requestLogger';
import { notFoundHandler } from './middleware/notFound';
import { handleError } from './utils/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware (should be first)
setupSecurity(app);

// CORS
setupCors(app);

// Rate limiting
setupRateLimit(app);

// Body parser
app.use(express.json());

// Request logging
app.use(requestLogger);

// Setup all routes and route-specific middleware
setupRoutes(app);

// 404 handler (must be before error handler)
app.use(notFoundHandler);

// Error handler middleware (must be last)
app.use(handleError);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

