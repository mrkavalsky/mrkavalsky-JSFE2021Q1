import { Request, Response } from 'express';
import { cards } from '../../cards';
import { STATISTICS } from '../statistics';

export const getCards = (req: Request, res: Response): void => {
  res.status(200).json(cards);
};

export const getMenuList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const menuList = cards.map(({ category, hash }) => {
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
  const menuCards = cards.map(({ category, hash, cardsList: [{ image }] }) => {
    return {
      category,
      hash,
      image,
    };
  });

  res.status(200).json(menuCards);
};

export const getCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const category = cards.filter(({ hash }) => hash === req.params.hash);

  res.status(200).json(...category);
};

export const getStatistics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json(STATISTICS);
};
