import QueryString from 'qs';
import Clubs from '../models/club';
import Match from '../models/match';
import { getClubsById } from './clubs-service';

export const getAllMatchsService = async () => {
  try {
    const getAll = await Match.findAll(
      {
        attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],

        include: [
          { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return getAll;
  } catch {
    return false;
  }
};

type Params = string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[];

export const getTrueOrFalseMatchsService = async (paramProgrees: Params) => {
  const bool = paramProgrees === 'true';
  try {
    const getAll = await Match.findAll(
      {
        where: { inProgress: bool },
        attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],

        include: [
          { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return getAll;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const checkClubsIds = async (id1: number, id2: number) => {
  const fristId = await getClubsById(id1);
  const secondId = await getClubsById(id2);
  return !!(fristId && secondId);
};

export const addMatchService = async (body: any) => {
  if (!body.inProgress) return false;
  try {
    const newMatch = await Match.create(body);
    return newMatch;
  } catch {
    return false;
  }
};

export const editMatchService = async (id: number) => {
  try {
    const editedMatch = await Match.update({ inProgress: false }, { where: { id } });
    return editedMatch;
  } catch {
    return false;
  }
};

export const editMatchGoalsService = async (
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  try {
    const editedMatch = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return editedMatch;
  } catch {
    return false;
  }
};

export default {
  checkClubsIds,
};
