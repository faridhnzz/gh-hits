import 'dotenv/config';
import fastify from './src/index.js';
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    fastify.listen({ port });
    console.log(`Server listening on`, port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
