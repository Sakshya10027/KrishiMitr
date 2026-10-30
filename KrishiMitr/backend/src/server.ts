import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { logger } from './middleware/requestLogger.js';

async function bootstrap() {
  const app = createApp();

  // Attempt database connection
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 KrishiMitr Backend Server running on http://localhost:${env.PORT}`);
    logger.info(`🌐 API Base URL: http://localhost:${env.PORT}/api/v1`);
    logger.info(`🩺 Health Check: http://localhost:${env.PORT}/api/v1/health`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Initiating graceful shutdown...`);
    server.close(async () => {
      await disconnectDatabase();
      logger.info('Server closed gracefully. Exiting process.');
      process.exit(0);
    });

    // Force shutdown after timeout if pending connections hang
    setTimeout(() => {
      logger.error('Forced shutdown after 10s timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to bootstrap KrishiMitr backend server');
  process.exit(1);
});
