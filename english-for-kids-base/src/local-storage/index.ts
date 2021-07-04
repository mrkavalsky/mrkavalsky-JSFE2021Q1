import { cards } from '../../public/cards';
import { ICards } from '../types/interfaces';
import { DATABASE } from './config';

export const getDatabase = (): ICards[] => {
  const storageDatabase = localStorage.getItem(DATABASE);

  return storageDatabase ? JSON.parse(storageDatabase) : cards;
};

export const setDatabase = (database: ICards): void => {
  const storageDatabase = JSON.stringify(database);

  localStorage.setItem(DATABASE, storageDatabase);
};
