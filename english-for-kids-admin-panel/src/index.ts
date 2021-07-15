import express from 'express';
import path from 'path';
import cors from 'cors';
import { PORT } from './config';
import { CARDS_ROUTER } from './routes/cards-router';
import { STATISTICS_ROUTER } from './routes/statistics-router';

function startServer(): void {
  const app = express();

  app.use('/', express.static(path.resolve(__dirname, '../static')));
  app.use('/api/content', express.static(path.resolve(__dirname, '../cards')));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/cards', CARDS_ROUTER);
  app.use('/api/statistics', STATISTICS_ROUTER);

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
}

startServer();
