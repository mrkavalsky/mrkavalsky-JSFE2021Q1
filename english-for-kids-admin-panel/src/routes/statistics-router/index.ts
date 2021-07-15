import { Router } from 'express';
import { getStatistics } from '../../controllers';

function createRouter(): Router {
  const router = Router();

  router.get('/', getStatistics);

  return router;
}

export const STATISTICS_ROUTER = createRouter();
