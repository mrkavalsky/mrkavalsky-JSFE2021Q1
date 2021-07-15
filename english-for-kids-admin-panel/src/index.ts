import express from 'express';
import path from 'path';
import cors from 'cors';
import { PORT } from './config';
import { ROUTER } from './routes';

function startServer(): void {
  const app = express();

  app.use('/', express.static(path.resolve(__dirname, '../static')));
  app.use('/api/content', express.static(path.resolve(__dirname, '../cards')));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/cards', ROUTER);

  app.listen(PORT, () => {
    console.log(
      `Server has been started on port ${PORT}...`,
    );
  });
}

startServer();
