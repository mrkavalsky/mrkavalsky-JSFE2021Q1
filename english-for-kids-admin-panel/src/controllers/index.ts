import { Request, Response } from 'express';
import { cards } from '../../cards';

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
