import { Router } from 'express';
import { getCards, getMenuList } from '../controllers/index';

function createRouter(): Router {
  const router = Router();

  router.get('/', getCards);
  router.get('/menu-list', getMenuList);

  return router;
}

export const ROUTER = createRouter();
