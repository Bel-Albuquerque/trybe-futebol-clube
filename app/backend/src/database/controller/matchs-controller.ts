import { Request, Response } from 'express';
import { getAllMatchsService, getTrueOrFalseMatchsService } from '../service/matchs-service';

export const getAllMatchsController = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const getAllMatchs = await getAllMatchsService();
    return res.status(200).json(getAllMatchs);
  }
  if (inProgress) {
    const getMatchs = await getTrueOrFalseMatchsService(inProgress);
    return res.status(200).json(getMatchs);
  }
  return res.status(401).end();
};

export const getTrueMatchsController = 'xablau';
