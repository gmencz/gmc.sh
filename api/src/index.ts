import express from 'express';
import { greenBright } from 'chalk';

const api = express();

api.get('/', (_, res) => {
  const redirectDestination =
    process.env.NODE_ENV === 'production'
      ? 'https://app.gmc.sh'
      : 'http://localhost:3000';

  res.redirect(redirectDestination);
});

api.get('/:slug', (req, res) => {
  const { slug } = req.params;
  /*
    Find ShortenedResouce in Dgraph with the slug identifier
    If it exists, redirect to the externalFQDN from that 
    ShortenedResource, if it doesn't, redirect to a route
    on "https://app.gmc.sh" where it would display a
    not found page.
  */
  res.json({ slug });
});

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
