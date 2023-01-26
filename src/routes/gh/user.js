import deta from '../../lib/db.js';
import { makeSvg } from '../../lib/utils.js';

export default async function (fastify, opts) {
  fastify.get('/:username', async function (request, reply) {
    const db = deta.Base('user');
    const { username } = request.params;

    if (!username) return reply.code(400).view('error.ejs', { statusCode: 400, status: 'Bad Request', message: ':username cannot be empty' });

    const result = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Mozilla/5.0 (gh-hits/1.0.0; +Owner) (+https://github.com/faridhnzz/gh-hits)',
      },
    });

    if (result.status === 404) return reply.code(404).view('error.ejs', { statusCode: 404, status: 'Page Not Found', message: ':username not found' });

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
