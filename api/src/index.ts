import express from 'express';
import { greenBright } from 'chalk';
import {
  redirectBySlug,
  redirectToApp,
} from './controllers/redirectionsController';

const api = express();

api.get('/:slug', redirectBySlug);
api.get('*', redirectToApp);

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
