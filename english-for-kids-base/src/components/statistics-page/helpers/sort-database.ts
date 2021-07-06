import { getDatabase } from '../../../local-storage';
import { IStatisticsCard } from '../../../types/interfaces';

export const sortDatabase = (key: keyof IStatisticsCard): IStatisticsCard[] => {
  const database = getDatabase();

  return database.sort(
    (firstCard: IStatisticsCard, secondCard: IStatisticsCard): number => {
      if (
        typeof firstCard[key] === 'number' &&
        firstCard[key] > secondCard[key]
      ) {
        return 1;
      }
      if (
        typeof firstCard[key] === 'string' &&
        firstCard[key] < secondCard[key]
      ) {
        return 1;
      }
      if (firstCard[key] === secondCard[key]) {
        return 0;
      }
      return -1;
    },
  );
};
