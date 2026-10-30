import { pinoHttp } from 'pino-http';
import { pino } from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
  formatters: {
    level: (label) => ({ level: label })
  },
  redact: ['req.headers.authorization', 'req.headers.cookie', 'body.password', 'body.passwordHash']
});

export const requestLogger = pinoHttp({
  logger,
  autoLogging: process.env.NODE_ENV !== 'test',
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});
