import { IGameWord, IStatisticsCard } from '../types/interfaces';
import { DATABASE, INITIAL_DATABASE } from './config';

export const getDatabase = (): IStatisticsCard[] => {
  const storageDatabase = localStorage.getItem(DATABASE);

  return storageDatabase ? JSON.parse(storageDatabase) : INITIAL_DATABASE;
};

export const setDatabase = (database: IStatisticsCard[]): void => {
  const storageDatabase = JSON.stringify(database);

  localStorage.setItem(DATABASE, storageDatabase);
};

const updateDatabase = (
  database: IStatisticsCard[],
  currentCards: IGameWord[],
) =>
  currentCards.reduce((newDatabase, { word, train, miss, isHit }) => {
    return newDatabase.map((item) => {
      if (word === item.word) {
        return {
          ...item,
          train: item.train + train,
          miss: item.miss + miss,
          hit: isHit ? item.hit + 1 : item.hit,
        };
      }
      return item;
    });
  }, database);

export const updateLocalStorage = (currentCards: IGameWord[]): void => {
  const database = getDatabase();
  const newDatabase = updateDatabase(database, currentCards);

  setDatabase(newDatabase);
};

export const clearLocalStorage = (): void => localStorage.clear();
