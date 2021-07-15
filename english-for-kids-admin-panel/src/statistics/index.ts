import { cards } from '../../cards';
import { ICardInfo, IStatistics, IStatisticsCard } from '../types/interfaces';

const getNewCardsList = (
  cardsList: ICardInfo[],
  category: string,
): IStatisticsCard[] =>
  cardsList.map(({ word, translation, train, hit, miss }) => {
    return {
      category,
      word,
      translation,
      train,
      hit,
      miss,
      errors: Math.floor((miss / (hit + miss)) * 100) || 0,
    };
  });

const initDatabase = (): IStatisticsCard[] => {
  const initValue: IStatisticsCard[] = [];

  return cards.reduce(
    (newCards, { cardsList, category }) => [
      ...newCards,
      ...getNewCardsList(cardsList, category),
    ],
    initValue,
  );
};

export function StatisticControl(): IStatistics {
  let STATISTICS = initDatabase();

  return {
    getValue() {
      return STATISTICS;
    },
    setValue(value: IStatisticsCard[]) {
      STATISTICS = value;
    },
  };
}

export const STATISTICS = StatisticControl();
