import { Request, Response, NextFunction } from 'express';
import { isNotPossibleTwoEqualTeams } from '../erros.ts/erroMessages';

export const postMatchValidation = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) return res.status(401).json(isNotPossibleTwoEqualTeams);
  next();
};

export const xablau = 'xablau';
