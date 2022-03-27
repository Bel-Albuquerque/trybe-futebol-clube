import { NextFunction, Request, Response } from 'express';
import {
  getAllMatchsService,
  getTrueOrFalseMatchsService,
  addMatchService,
} from '../service/matchs-service';

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

export const addMatchController = async (req: Request, res: Response) => {
  const newMatch = await addMatchService(req.body);
  if (!newMatch) return res.status(401).end();
  return res.status(201).json(newMatch);
};
