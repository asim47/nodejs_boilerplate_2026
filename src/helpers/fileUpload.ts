import { Express } from 'express';
import fileUpload from 'express-fileupload';

export function setupFileUpload(app: Express): void {
  app.use(
    fileUpload({
      createParentPath: true,
      limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
      abortOnLimit: true,
      responseOnLimit: 'File size limit has been reached',
      safeFileNames: true,
      preserveExtension: true,
    })
  );
}

