import { Request, Response } from 'express';
import { teamNotFound } from '../erros.ts/erroMessages';
import {
  getAllMatchsService,
  getTrueOrFalseMatchsService,
  addMatchService,
  editMatchService,
  checkClubsIds,
  editMatchGoalsService,
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
  const { homeTeam, awayTeam } = req.body;

  const validClubs = await checkClubsIds(Number(homeTeam), Number(awayTeam));
  if (!validClubs) return res.status(401).json(teamNotFound);

  const newMatch = await addMatchService(req.body);
  if (!newMatch) return res.status(401).end();

  return res.status(201).json(newMatch);
};

export const editMatchController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const editMatch = await editMatchService(Number(id));
  if (!editMatch) return res.status(401).end();
  return res.status(200).json(editMatch);
};

export const editMatchGoalsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const editMatch = await editMatchGoalsService(Number(id), homeTeamGoals, awayTeamGoals);
  if (!editMatch) return res.status(401).end();
  return res.status(200).json(editMatch);
};
