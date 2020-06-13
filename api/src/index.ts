import express from 'express';
import { greenBright } from 'chalk';

const api = express();

api.get('/:slug', (req, res) => {
  const { slug } = req.params;
  res.json({ slug });
});

const PORT = process.env.PORT || 8081;
api.listen(PORT, () => {
  console.log(`${greenBright(`🚀 gmc.sh API listening on port ${PORT}`)}`);
});
