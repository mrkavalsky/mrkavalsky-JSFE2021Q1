import { Router } from 'express';
import { getSortStatistics, getStatistics } from '../../controllers';

function createRouter(): Router {
  const router = Router();

  router.get('/', getStatistics);
  router.get('/:key&:type', getSortStatistics);

  return router;
}

export const STATISTICS_ROUTER = createRouter();
