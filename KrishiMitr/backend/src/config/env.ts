import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().default('postgresql://postgres:postgrespassword@localhost:5432/krishimitr?schema=public'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),

  JWT_ACCESS_SECRET: z.string().default('krishimitr_development_jwt_access_secret_super_secure_key_10283'),
  JWT_REFRESH_SECRET: z.string().default('krishimitr_development_jwt_refresh_secret_super_secure_key_84920'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(500),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().default(20),

  AI_PROVIDER: z.enum(['fallback', 'gemini', 'anthropic', 'openai', 'groq', 'grok']).default('groq'),
  AI_API_KEY: z.string().optional().default(''),
  AI_MODEL: z.string().default('openai/gpt-oss-120b'),
  AI_BASE_URL: z.string().optional().default('https://api.groq.com/openai/v1'),

  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  UPLOAD_DIR: z.string().default('./uploads')
});

export const env = envSchema.parse(process.env);
