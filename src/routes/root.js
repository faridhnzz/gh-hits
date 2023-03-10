'use strict';
import mCache from '../lib/cache.js';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    if (process.env.NODE_ENV !== 'production') return { hello: 'world' };
    reply.redirect(302, 'https://github.com/faridhnzz/gh-hits');
  });

  fastify.get('/stats', async function (request, reply) {
    return mCache.getStats();
  });
}
