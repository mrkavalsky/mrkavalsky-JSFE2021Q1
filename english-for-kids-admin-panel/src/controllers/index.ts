import { Request, Response } from 'express';
import { DEFAULT_IMAGE } from '../../cards';
import { CARDS } from '../init-cards';

import { STATISTICS } from '../statistics';
import { getDifficultWords } from '../statistics/helpers/get-difficult-words';
import { sortStatistics } from '../statistics/helpers/sort-database';
import {
  INewCategory,
  IStatisticsCard,
  IUpdateCategory,
} from '../types/interfaces';

export const getCards = (req: Request, res: Response): void => {
  res.status(200).json(CARDS.getValue());
};

export const getMenuList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const menuList = CARDS.getValue().map(({ category, hash }) => {
    return {
      category,
      hash,
    };
  });

  res.status(200).json(menuList);
};

export const getMenuCards = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const menuCards = CARDS.getValue().map(({ category, hash, cardsList }) => {
    return {
      category,
      hash,
      image: cardsList[0] ? cardsList[0].image : DEFAULT_IMAGE,
    };
  });

  res.status(200).json(menuCards);
};

export const getCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const category = CARDS.getValue().filter(
    ({ hash }) => hash === req.params.hash,
  );

  res.status(200).json(...category);
};

export const getStatistics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json(STATISTICS.getValue());
};

export const getSortStatistics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const key = req.params.key as keyof IStatisticsCard;
  const sortedStatistics = sortStatistics(key, req.params.type);

  res.status(200).json(sortedStatistics);
};

export const getDifficultCards = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const words = getDifficultWords();

  res.status(200).json(words);
};

export const postStatistics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newStatistics = req.body as IStatisticsCard[];

  STATISTICS.setValue(newStatistics);

  res.status(201).json(STATISTICS.getValue());
};

export const postCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { categoryName, isUserLogin } = req.body as INewCategory;

  if (isUserLogin) {
    const newCards = CARDS.getValue();
    const category = categoryName.trim();
    const hash = category.split(' ').join('-');

    newCards.push({
      category,
      hash,
      cardsList: [],
    });

    CARDS.setValue(newCards);

    res.status(201).json(CARDS.getValue());
  }
};

export const putCategoryName = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { categoryName, isUserLogin, hash } = req.body as IUpdateCategory;

  if (isUserLogin) {
    const cards = CARDS.getValue();
    const currentCard = cards.find((card) => card.hash === hash);

    if (currentCard) {
      const category = categoryName.trim();
      const newHash = category.split(' ').join('-');

      currentCard.category = category;
      currentCard.hash = newHash;

      res.json(currentCard);
    }
  }
};
