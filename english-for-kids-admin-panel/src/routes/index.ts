import { Router } from 'express';
import { getCards } from '../controllers/index';

function createRouter(): Router {
  const router = Router();

  router.get('/api/cards', getCards);

  return router;
}

export const ROUTER = createRouter();
