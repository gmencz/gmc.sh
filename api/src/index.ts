import express from 'express';
import morgan from 'morgan';
import { greenBright } from 'chalk';
import {
  redirectBySlug,
  redirectToApp,
} from './controllers/redirectionsController';

const api = express();

api.use(morgan('combined'));

api.get('/:slug', redirectBySlug);
api.get('*', redirectToApp);

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
