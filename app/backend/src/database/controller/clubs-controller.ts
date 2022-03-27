import { Request, Response } from 'express';
import { getAllClubsService, getByIdClubService } from '../service/clubs-service';

export const getAllClubsController = async (req: Request, res: Response) => {
  const getAllClubs = await getAllClubsService();
  if (getAllClubs) return res.status(200).json(getAllClubs);
  return res.status(401).end();
};

export const getByIdClubController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const getByIdClub = await getByIdClubService(Number(id));
  if (getByIdClub) return res.status(200).json(getByIdClub);
  return res.status(401).end();
};
