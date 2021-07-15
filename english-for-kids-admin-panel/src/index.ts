import express from 'express';
import path from 'path';
import { PORT } from './config';
import { ROUTER } from './routes';

function startServer(): void {
  const app = express();

  app.use(express.static(path.resolve(__dirname, '../static')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(ROUTER);

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
}

startServer();
