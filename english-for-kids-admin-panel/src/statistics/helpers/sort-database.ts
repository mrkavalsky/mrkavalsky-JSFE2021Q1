import { STATISTICS } from '..';
import { IStatisticsCard } from '../../types/interfaces';
import { ASC_SORT } from '../config';
import { getSortASC } from './sort-asc';
import { getSortDESC } from './sort_desc';

export const sortStatistics = (
  key: keyof IStatisticsCard,
  sortType: string,
): IStatisticsCard[] => {
  const sortDirection =
    sortType === ASC_SORT ? getSortASC(key) : getSortDESC(key);

  return STATISTICS.getValue().sort(sortDirection);
};
