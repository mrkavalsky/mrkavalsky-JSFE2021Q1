import { getDatabase } from '../../../local-storage';
import { IStatisticsCard } from '../../../types/interfaces';
import { KeyType } from '../../../types/types';

export const sortDatabase = (
  key: keyof IStatisticsCard,
  type: KeyType,
): IStatisticsCard[] => {
  const database = getDatabase();

  if (type === 'number') {
    return database.sort(
      (firstCard: IStatisticsCard, secondCard: IStatisticsCard): number => {
        if (firstCard[key] > secondCard[key]) return 1;
        if (firstCard[key] === secondCard[key]) return 0;
        return -1;
      },
    );
  }

  return database.sort(
    (firstCard: IStatisticsCard, secondCard: IStatisticsCard): number => {
      if (firstCard[key] < secondCard[key]) return 1;
      if (firstCard[key] === secondCard[key]) return 0;
      return -1;
    },
  );
};
