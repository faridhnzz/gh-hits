import 'dotenv/config';
import Fastify from 'fastify';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true,
  trustProxy: true,
  ignoreTrailingSlash: true,
  connectionTimeout: 5000,
});

fastify.setErrorHandler(async (error, request, reply) => {
  if (process.env.NODE_ENV !== 'production') return error;
  reply.code(500);
  return {
    statusCode: 500,
    status: 'Internal Server Error',
  };
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/etag'));
fastify.register(import('@fastify/view'), {
  engine: {
    ejs,
  },
  root: join(__dirname, 'templates'),
});

fastify.register(import('./routes/root.js'));
fastify.register(import('./routes/gh/user.js'));
fastify.register(import('./routes/gh/repo.js'));

export default fastify;
