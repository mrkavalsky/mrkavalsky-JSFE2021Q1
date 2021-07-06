import { IStatisticsCard } from '../../../types/interfaces';

export const getSortDESC = (key: keyof IStatisticsCard) => {
  return (firstCard: IStatisticsCard, secondCard: IStatisticsCard): number => {
    if (
      typeof firstCard[key] === 'number' &&
      firstCard[key] < secondCard[key]
    ) {
      return 1;
    }
    if (
      typeof firstCard[key] === 'string' &&
      firstCard[key] > secondCard[key]
    ) {
      return 1;
    }
    if (firstCard[key] === secondCard[key]) {
      return 0;
    }
    return -1;
  };
};
