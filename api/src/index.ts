import express from 'express';
import morgan from 'morgan';
import { greenBright } from 'chalk';
import {
  redirectBySlug,
  redirectToApp,
} from './controllers/redirectionsController';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const api = express();

// Middlewares ->
// Secure response headers for protection against possible attacks
api.use(helmet());

// Only allow 100 requests every 30 minutes.
api.use(
  rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 100,
  })
);

// Log every request
api.use(morgan('combined'));

// API endpoints ->
// Redirect to the shortened URL by slug
api.get('/:slug', redirectBySlug);

// Redirect to react application whenever we hit a route
// which isn't the /:slug one
api.get('*', redirectToApp);

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
