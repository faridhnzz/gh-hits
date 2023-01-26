'use strict';
import 'dotenv/config';
import { Deta } from 'deta';
import { makeSvg } from '../../utils.js';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const db = deta.Base('gh-hits');

    const { username } = request.query;

    if (!username) return reply.code(400).view('error.ejs', { statusCode: 400, status: 'Bad Request', message: 'username cannot be empty' });

    const result = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (gh-hits/1.0.0; +Owner) (+https://github.com/faridhnzz/gh-hits)',
      },
    });

    if (result.status === 404) return reply.code(404).view('error.ejs', { statusCode: 404, status: 'Page Not Found', message: 'username not found' });

    const dbRest = await db.get(username);
    let newHits = 0;
    if (dbRest === null) {
      newHits = newHits + 1;
    } else {
      newHits = parseInt(dbRest.hits) + 1;
    }

    await db.put({ hits: String(newHits) }, username);

    reply.headers({
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'private, no-cache, no-store',
    });
    return reply.send(makeSvg(newHits));
  });
}
