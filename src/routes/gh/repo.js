import deta from '../../lib/db.js';
import { makeSvg } from '../../lib/utils.js';

export default async function (fastify, opts) {
  fastify.get('/:username/:repo', async function (request, reply) {
    const db = deta.Base('repository');
    const { username, repo } = request.params;

    if (!username & !repo) return reply.code(400).view('error.ejs', { statusCode: 400, status: 'Bad Request', message: ':username & :repo cannot be empty' });

    const result = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Mozilla/5.0 (gh-hits/1.0.0; +Owner) (+https://github.com/faridhnzz/gh-hits)',
      },
    });

    if (result.status === 404) return reply.code(404).view('error.ejs', { statusCode: 404, status: 'Page Not Found', message: ':repo not found' });

    const dbRest = await db.get(repo);
    let newHits = 0;
    if (dbRest === null) {
      newHits = newHits + 1;
    } else {
      newHits = parseInt(dbRest.hits) + 1;
    }

    await db.put({ user: String(username), hits: String(newHits) }, repo);

    reply.headers({
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'private, no-cache, no-store',
    });
    return reply.send(makeSvg(newHits));
  });
}
