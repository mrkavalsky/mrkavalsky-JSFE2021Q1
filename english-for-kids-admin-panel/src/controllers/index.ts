import { Request, Response } from 'express';
import { cards } from '../../cards';

export const getCards = (req: Request, res: Response): void => {
  res.status(200).json(cards);
};
