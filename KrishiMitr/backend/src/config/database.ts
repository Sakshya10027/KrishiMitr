import { PrismaClient } from '@prisma/client';
import { pino } from 'pino';

const logger = pino({ name: 'database' });

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

export const prisma = global.__prismaClient || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

if (process.env.NODE_ENV !== 'production') {
  global.__prismaClient = prisma;
}

export async function connectDatabase(): Promise<boolean> {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL Database successfully via Prisma');
    return true;
  } catch (error) {
    logger.error({ error }, 'Failed to connect to PostgreSQL Database');
    return false;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  logger.info('Disconnected from PostgreSQL Database');
}
