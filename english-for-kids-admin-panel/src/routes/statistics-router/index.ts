import { Router } from 'express';
import { getSortStatistics, getStatistics } from '../../controllers';
import { getDifficultWords } from '../../statistics/helpers/get-difficult-words';

function createRouter(): Router {
  const router = Router();

  router.get('/', getStatistics);
  router.get('/:key&:type', getSortStatistics);
  router.get('/words', getDifficultWords);

  return router;
}

export const STATISTICS_ROUTER = createRouter();
