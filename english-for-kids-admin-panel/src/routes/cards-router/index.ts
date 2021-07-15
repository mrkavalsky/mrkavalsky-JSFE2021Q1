import { Router } from 'express';
import {
  getCards,
  getCategory,
  getMenuCards,
  getMenuList,
  postCategory,
  putCategoryName,
} from '../../controllers/index';

function createRouter(): Router {
  const router = Router();

  router.get('/', getCards);
  router.get('/menu-list', getMenuList);
  router.get('/menu-cards', getMenuCards);
  router.get('/:hash', getCategory);
  router.post('/', postCategory);
  router.put('/', putCategoryName);

  return router;
}

export const CARDS_ROUTER = createRouter();
