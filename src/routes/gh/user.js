import deta from '../../lib/db.js';
import { makeSvg } from '../../lib/utils.js';
import mCache from '../../lib/cache.js';

export default async function (fastify, opts) {
  fastify.get('/:username', async function (request, reply) {
    const db = deta.Base('user');
    const { username } = request.params;
    const { label, color, style, lcolor } = request.query;

    if (!username) return reply.code(400).view('error.ejs', { statusCode: 400, status: 'Bad Request', message: ':username cannot be empty' });
    const cacheId = mCache.get(username);

    if (cacheId) {
      const newHits = await storeDB(db, cacheId, username);

      reply.headers({
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'private, no-cache, no-store',
      });
      return reply.send(makeSvg(newHits, label, lcolor, color, style));
    }

    const rest = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Mozilla/5.0 (gh-hits/1.0.0; +Owner) (+https://github.com/faridhnzz/gh-hits)',
      },
    });

    if (rest.status === 404) return reply.code(404).view('error.ejs', { statusCode: 404, status: 'Page Not Found', message: ':username not found' });
    const data = await rest.json();
    const id = data && data.id;

    mCache.set(username, Number(id), 3600);
    const newHits = await storeDB(db, id);

    reply.headers({
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'private, no-cache, no-store',
    });
    return reply.send(makeSvg(newHits, label, color, style));
  });
}

async function storeDB(db, id) {
  const dbRest = await db.get(String(id));
  let newHits = 0;
  if (dbRest === null) {
    newHits = newHits + 1;
  } else {
    newHits = parseInt(dbRest.hits) + 1;
  }

  await db.put({ hits: Number(newHits) }, String(id));
  return newHits;
}
