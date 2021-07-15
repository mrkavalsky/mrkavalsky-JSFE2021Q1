import { Router } from 'express';
import {
  getCards,
  getCategory,
  getMenuCards,
  getMenuList,
} from '../controllers/index';

function createRouter(): Router {
  const router = Router();

  router.get('/', getCards);
  router.get('/menu-list', getMenuList);
  router.get('/menu-cards', getMenuCards);
  router.get('/:hash', getCategory);

  return router;
}

export const ROUTER = createRouter();
