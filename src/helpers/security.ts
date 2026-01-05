import { Express } from 'express';
import helmet from 'helmet';

export function setupSecurity(app: Express): void {
  app.use(helmet());
}

