import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import etag from '@fastify/etag';
import view from '@fastify/view';
import AutoLoad from '@fastify/autoload';
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

fastify.register(cors);
fastify.register(etag);
fastify.register(view, {
  engine: {
    ejs,
  },
  root: join(__dirname, 'templates'),
});

fastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  indexPattern: /.*index(\.ts|\.js|\.cjs|\.mjs)$/,
});

export default fastify;
