import QueryString from 'qs';
import Clubs from '../models/club';
import Match from '../models/match';

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

export const addMatchService = async (body: any) => {
  if (body.inProgress === false) return false;
  try {
    const newMatch = await Match.create(body);
    console.log(newMatch);
    return newMatch;
  } catch {
    return false;
  }
};
