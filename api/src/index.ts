import express from 'express';
import { greenBright } from 'chalk';
import { DgraphClientStub, DgraphClient } from 'dgraph-js-http';

const api = express();

interface FindShortenedResourceData {
  shortenedResourceResult: { 'ShortenedResource.originalFQDN': string }[];
}

const dgraphClientStub = new DgraphClientStub('http://localhost:8080');
const dgraphClient = new DgraphClient(dgraphClientStub);

api.get('/', (_, res) => {
  const redirectDestination =
    process.env.NODE_ENV === 'production'
      ? 'https://app.gmc.sh'
      : 'http://localhost:3000';

  return res.redirect(redirectDestination);
});

api.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  // Dgraph query to find resource by slug
  const shortenedResourceQuery = `
    query ShortenedResourceBySlug($slug: string) {
      shortenedResourceResult(func: eq(ShortenedResource.slug, $slug)) {
        ShortenedResource.originalFQDN
      }
    }
  `;

  try {
    // Start dgraph query transaction with slug from query params
    const shortenedResourceQueryVars = { $slug: slug };
    const queryRes = await dgraphClient
      .newTxn()
      .queryWithVars(shortenedResourceQuery, shortenedResourceQueryVars);

    const data = queryRes.data as FindShortenedResourceData;

    /*
    If there's no shortened URL with the specified slug,
    redirect to a not found route so the end user
    knows what happened
  */
    if (data.shortenedResourceResult.length !== 1) {
      const redirectDestination =
        process.env.NODE_ENV === 'production'
          ? 'https://app.gmc.sh/error?code=not_found'
          : 'http://localhost:3000/error?code=not_found';

      return res.redirect(redirectDestination);
    }

    /*
    Get the original FQDN (Fully qualified domain name) and redirect
    to it
  */

    const shortenedResourceOriginalFQDN =
      data.shortenedResourceResult[0]['ShortenedResource.originalFQDN'];

    return res.redirect(shortenedResourceOriginalFQDN);
  } catch (error) {
    const redirectDestination =
      process.env.NODE_ENV === 'production'
        ? 'https://app.gmc.sh/error?code=unknown'
        : 'http://localhost:3000/error?code=unknown';

    return res.redirect(redirectDestination);
  }
});

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
