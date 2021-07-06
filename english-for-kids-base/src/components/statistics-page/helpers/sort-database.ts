import { getDatabase } from '../../../local-storage';
import { IStatisticsCard } from '../../../types/interfaces';
import { ASC_SORT } from '../config';
import { getSortASC } from './sort-asc';
import { getSortDESC } from './sort_desc';

export const sortDatabase = (
  key: keyof IStatisticsCard,
  sortType: string,
): IStatisticsCard[] => {
  const database = getDatabase();
  const sortDirection =
    sortType === ASC_SORT ? getSortASC(key) : getSortDESC(key);

  return database.sort(sortDirection);
};
