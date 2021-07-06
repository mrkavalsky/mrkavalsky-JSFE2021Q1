import { cards } from '../../public/cards';
import { ICards, IGameWord } from '../types/interfaces';
import { DATABASE } from './config';

export const getDatabase = (): ICards[] => {
  const storageDatabase = localStorage.getItem(DATABASE);

  return storageDatabase ? JSON.parse(storageDatabase) : cards;
};

export const setDatabase = (database: ICards[]): void => {
  const storageDatabase = JSON.stringify(database);

  localStorage.setItem(DATABASE, storageDatabase);
};

const updateCategory = (
  category: ICards,
  currentCards: IGameWord[],
): ICards => {
  const newCardsList = currentCards.reduce((list, card) => {
    return list.map((item) => {
      if (card.word === item.word) {
        return {
          ...item,
          train: item.train + card.train,
          miss: item.miss + card.miss,
          hit: card.isHit ? item.hit + 1 : item.hit,
        };
      }
      return item;
    });
  }, category.cardsList);

  return { ...category, cardsList: newCardsList };
};

export const updateLocalStorage = (
  currentCards: IGameWord[],
  hash: string,
): void => {
  const database = getDatabase();
  const category = database.find((e) => e.hash === hash);

  if (category) {
    const newCategory = updateCategory(category, currentCards);
    const newDatabase = database.map((item) =>
      item.category === newCategory.category ? newCategory : item,
    );

    setDatabase(newDatabase);
  } else {
    setDatabase(database);
  }
};
