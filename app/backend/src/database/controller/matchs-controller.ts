import { Request, Response } from 'express';
import { getAllMatchsService } from '../service/matchs-service';

export const getAllMatchsController = async (req: Request, res: Response) => {
  const getAllMatchs = await getAllMatchsService();
  if (getAllMatchs) return res.status(200).json(getAllMatchs);
  return res.status(401).end();
};
export const xablau = 'xablau';
