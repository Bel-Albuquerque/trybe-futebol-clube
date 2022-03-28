import { Request, Response } from 'express';
import settingUpLeaderbord from '../service/leaderboard-service';

export const getHomeLeaderBoardController = async (req: Request, res: Response) => {
  const getHomeLeaderBoard = await settingUpLeaderbord('home');

  return res.status(200).json(getHomeLeaderBoard);
};

export const getAwayLeaderBoardController = async (req: Request, res: Response) => {
  const getAwayLeaderBoard = await settingUpLeaderbord('away');

  return res.status(200).json(getAwayLeaderBoard);
};

export const getAllLeaderBoardController = async (req: Request, res: Response) => {
  const getAllLeaderBoard = await settingUpLeaderbord('all');

  return res.status(200).json(getAllLeaderBoard);
};
