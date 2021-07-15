import { Router } from 'express';
import { getCards, getMenuCards, getMenuList } from '../controllers/index';

function createRouter(): Router {
  const router = Router();

  router.get('/', getCards);
  router.get('/menu-list', getMenuList);
  router.get('/menu-cards', getMenuCards);

  return router;
}

export const ROUTER = createRouter();
