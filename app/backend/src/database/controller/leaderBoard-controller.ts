import { Request, Response } from 'express';
import { settingUpLeaderbord } from '../service/leaderboard-service';

export const gethomeLeaderBoardController = async (req: Request, res: Response) => {
  const gethomeLeaderBoard = await settingUpLeaderbord();

  return res.status(200).json(gethomeLeaderBoard);
};

export const getByIdClubController = 'ksadlsd';
