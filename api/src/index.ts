import express from 'express';
import morgan from 'morgan';
import { greenBright } from 'chalk';
import {
  redirectBySlug,
  redirectToApp,
} from './controllers/redirectionsController';
import helmet from 'helmet';

const api = express();

// Middlewares ->
// Log every request
api.use(morgan('combined'));
api.use(helmet());

// Redirect to the shortened URL by slug
api.get('/:slug', redirectBySlug);

// Redirect to react application whenever we hit a route
// which isn't the /:slug one
api.get('*', redirectToApp);

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
