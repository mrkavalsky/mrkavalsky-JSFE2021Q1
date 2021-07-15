import { Router } from 'express';
import {
  getSortStatistics,
  getStatistics,
  postStatistics,
} from '../../controllers';
import { getDifficultWords } from '../../statistics/helpers/get-difficult-words';

function createRouter(): Router {
  const router = Router();

  router.get('/', getStatistics);
  router.get('/:key&:type', getSortStatistics);
  router.get('/words', getDifficultWords);
  router.post('/', postStatistics);

  return router;
}

export const STATISTICS_ROUTER = createRouter();
