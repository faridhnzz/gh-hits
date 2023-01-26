import fastify from './src/index.js';

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};
